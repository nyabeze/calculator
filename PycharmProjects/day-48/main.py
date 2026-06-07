from selenium import webdriver
from selenium.webdriver.common.by import By

#Keep Chrome browser open after it finishes
chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option("detach", True)

driver = webdriver.Chrome(options=chrome_options)
driver.get('https://www.python.org/')
#
# search_bar = driver.find_element(By.NAME, value="q")
# print(search_bar.get_attribute("placeholder"))
# button = driver.find_element(By.ID, value="submit")
# print(button.size)
#
# documentation_link = driver.find_element(By.CSS_SELECTOR, value=".documentation-widget a")
# print(documentation_link.text)
# # driver.close()
# driver.quit()

# bug_link = driver.find_element(By.XPATH, value='//*[@id="site-map"]/div[2]/div/ul/li[3]/a')
# print(bug_link.text)

event_times = driver.find_elements(By.CSS_SELECTOR, value='.event-widget .menu time')
event_names = driver.find_elements(By.CSS_SELECTOR, value='.event-widget .menu a')

times = [time.text for time in event_times]
events = [name.text for name in event_names]
event_list = {}
for i in range(len(times)):
    event_list[i] = {
        "time": times[i],
        "name": events[i]
    }
#     event_list.append(my_dict)
#
# final_dict = {}
#
# for i in range(len(event_list)):
#     final_dict[i] = event_list[i]


# myDict = {t: e for (t, e) in zip(times, events)}

print(event_list)

driver.quit()
