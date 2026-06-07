from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

#Keep Chrome browser open after it finishes
chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option("detach", True)

driver = webdriver.Chrome(options=chrome_options)
driver.get('https://en.wikipedia.org/wiki/Main_Page')

all_portals = driver.find_element(By.LINK_TEXT ,'September 11')
print(all_portals.text)

# article_number = driver.find_element(By.CSS_SELECTOR, value='#articlecount a')
# print(article_number.text)
# article_number.click()
search_icon = driver.find_element(By.CSS_SELECTOR, 'vector-icon')
search_icon.click()
search = driver.find_element(By.NAME, 'Python')
search.send_keys(Keys.ENTER)


driver.quit()