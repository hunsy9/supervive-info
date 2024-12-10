# hunters/utils.py

from enum import Enum
import json
import time

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


class Gamemode(Enum):
    SQUAD = 1
    DUO = 2


def get_driver_options():
    options = webdriver.ChromeOptions()
    options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36')
    options.add_experimental_option('excludeSwitches', ['enable-logging', 'enable-automation'])
    options.add_experimental_option("useAutomationExtension", False)
    options.add_argument('--disable-blink-features=AutomationControlled')
    return options


def get_driver(options):
    driver = webdriver.Chrome(service=Service(), options=options)
    return driver


def get_hunter_statistics(game_mode):
    hunter_statistics = []

    target_url = 'https://supervive.app/hunters'
    options = get_driver_options()
    driver = get_driver(options)
    driver.get(target_url)

    if game_mode == Gamemode.DUO:
        WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.TAG_NAME, 'button')))
        driver.find_elements(By.TAG_NAME, 'button')[3].click()
        time.sleep(3)

    table = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'table')))
    # headers = [x.text for x in table.find_element(By.TAG_NAME, 'tr').find_elements(By.TAG_NAME, 'th')]

    headers = ['hunter_name', 'win_rate', 'pick_rate', 'average_rank', 'average_kd_rate',]
    hunters = table.find_elements(By.TAG_NAME, 'tr')[1:]
    for hunter in hunters:
        hunter_metric_elements = hunter.find_elements(By.TAG_NAME, 'td')
        imglink = hunter_metric_elements[0].find_element(By.TAG_NAME, 'img').get_attribute('src')
        metrics = [x.text for x in hunter_metric_elements]
        new_hunter = {}
        
        need_index = [0, 1, 3, 4, 7]
        for header_index, metric_index in enumerate(need_index):
            if header_index == 0:
                new_hunter[headers[header_index]] = metrics[metric_index]
            else:
                new_hunter[headers[header_index]] = float(metrics[metric_index].replace('%', ''))
            
        new_hunter['hunter_avatar'] = imglink
        hunter_statistics.append(new_hunter)

    driver.quit()
    return hunter_statistics
