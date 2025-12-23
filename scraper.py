
import requests
from bs4 import BeautifulSoup
import json
import re

def get_soup(url):
    """Fetches a URL and returns a BeautifulSoup object."""
    try:
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()
        return BeautifulSoup(response.content, 'html.parser')
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None

def scrape_article_content(article_url):
    """Scrapes the main content from a single article page."""
    soup = get_soup(article_url)
    if not soup:
        return "Content could not be scraped."

    # Common selectors for article content. We try them in order.
    # The selector 'div.w-full.prose.lg:prose-lg.max-w-none' seems specific to this site.
    content_selectors = [
        'div.w-full.prose.lg\\:prose-lg.max-w-none',
        'div[itemprop="articleBody"]',
        '.entry-content',
        '.post-content',
        'article'
    ]
    
    content_div = None
    for selector in content_selectors:
        content_div = soup.select_one(selector)
        if content_div:
            break
            
    if content_div:
        # Clone the div and remove unwanted elements to avoid modifying the original
        content_clone = BeautifulSoup(str(content_div), 'html.parser')
        
        # Remove elements that are typically not part of the main content
        for selector in ['header', 'footer', '.meta', '.author', '.comments', 'script', 'style']:
            for element in content_clone.select(selector):
                element.decompose()
        
        return content_clone.get_text(separator='\n', strip=True)
    else:
        return "Main content not found."


def main():
    """Main function to scrape BeyondChats blog."""
    base_url = "https://beyondchats.com"
    blogs_url = f"{base_url}/blogs"
    
    print(f"Starting scrape of {blogs_url}")
    soup = get_soup(blogs_url)
    if not soup:
        return

    # Find the last page number
    last_page_num = 0
    pagination_links = soup.select('a.page-numbers')
    for link in pagination_links:
        # Find numeric page numbers, ignoring "Next" etc.
        page_num_text = link.get_text(strip=True)
        if page_num_text.isdigit():
            last_page_num = max(last_page_num, int(page_num_text))
            
    if last_page_num == 0:
        print("Could not determine the last page. Scraping the first page only.")
        last_page_num = 1

    last_page_url = f"{blogs_url}/page/{last_page_num}"
    print(f"Found last page: {last_page_num}. Scraping {last_page_url}")

    soup = get_soup(last_page_url)
    if not soup:
        return

    articles_to_scrape = []
    # The articles are within 'article' tags with a specific class structure
    article_elements = soup.select('article[class*="post-"]')
    
    if not article_elements:
        print("No articles found on the last page. Please check the selectors.")
        return

    print(f"Found {len(article_elements)} articles on the last page.")
    
    # The articles on the last page are the oldest. We take up to 5.
    for article_el in article_elements[:5]:
        title_element = article_el.select_one('h3.entry-title a') or article_el.select_one('h2.entry-title a')
        image_element = article_el.select_one('img.object-cover')
        
        if title_element and title_element.get('href'):
            article_info = {
                "title": title_element.get_text(strip=True),
                "source_url": title_element.get('href'),
                "image_url": image_element.get('src') if image_element else None,
                "original_content": ""
            }
            articles_to_scrape.append(article_info)
        else:
            print("Could not find title or link for an article, skipping.")

    scraped_articles = []
    for article in articles_to_scrape:
        print(f"Scraping content from: {article['source_url']}")
        article['original_content'] = scrape_article_content(article['source_url'])
        scraped_articles.append(article)

    # Save data to a JSON file
    output_file = 'articles.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(scraped_articles, f, indent=4, ensure_ascii=False)

    print(f"Scraping complete. {len(scraped_articles)} articles saved to {output_file}")

if __name__ == '__main__':
    main()
