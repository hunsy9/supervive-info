import os
import json
from .utils import get_hunter_statistics, Gamemode
import requests
import traceback
from apscheduler.schedulers.background import BackgroundScheduler

def update_hunter_data():
    # JSON 파일 경로 설정
    base_path = os.path.join('hunters', 'data')
    os.makedirs(base_path, exist_ok=True)
    squad_file = os.path.join(base_path, 'squad.json')
    duo_file = os.path.join(base_path, 'duo.json')

    try:
        # SQUAD 데이터 크롤링 및 저장
        squad_data = get_hunter_statistics(Gamemode.SQUAD)
        with open(squad_file, 'w', encoding='utf-8') as f:
            json.dump(squad_data, f, ensure_ascii=False, indent=4)

        # DUO 데이터 크롤링 및 저장
        duo_data = get_hunter_statistics(Gamemode.DUO)
        with open(duo_file, 'w', encoding='utf-8') as f:
            json.dump(duo_data, f, ensure_ascii=False, indent=4)

        print("Hunter data updated successfully.")
    except Exception as e:
        print(f"Error during crawling: {e}")
        traceback.print_exc()



def send_hunter_data():
    # JSON 파일 경로 설정
    base_path = os.path.join('hunters', 'data')
    squad_file = os.path.join(base_path, 'squad.json')
    duo_file = os.path.join(base_path, 'duo.json')

    # URL 설정
    # squad_url = "http://127.0.0.1:8000/hunters/statistics/squad"
    # duo_url = "http://127.0.0.1:8000/hunters/statistics/duo"
    squad_url = 'http://127.0.0.1:8000/api/hunter_statistics/crawler?meta_tag=SQUAD'
    duo_url = 'http://127.0.0.1:8000/api/hunter_statistics/crawler?meta_tag=DUO'

    # SQUAD 데이터 전송
    if os.path.exists(squad_file):
        try:
            with open(squad_file, 'r', encoding='utf-8') as f:
                squad_data = json.load(f)
            response_squad = requests.post(squad_url, json=squad_data, timeout=10)
            print(f"SQUAD Response: {response_squad.status_code}, {response_squad.text}")
        except requests.exceptions.RequestException as e:
            print(f"Error sending SQUAD data: {e}")
        except Exception as e:
            print(f"Error reading SQUAD file: {e}")

    # DUO 데이터 전송
    if os.path.exists(duo_file):
        try:
            with open(duo_file, 'r', encoding='utf-8') as f:
                duo_data = json.load(f)
            response_duo = requests.post(duo_url, json=duo_data, timeout=10)
            print(f"DUO Response: {response_duo.status_code}, {response_duo.text}")
        except requests.exceptions.RequestException as e:
            print(f"Error sending DUO data: {e}")
        except Exception as e:
            print(f"Error reading DUO file: {e}")



def start_scheduler():
    update_hunter_data()
    scheduler = BackgroundScheduler()

    # 30분마다 데이터 업데이트 후 전송
    def update_and_send():
        update_hunter_data()  # 데이터 크롤링 및 파일 저장
        send_hunter_data()    # 저장된 데이터 서버로 전송

    scheduler.add_job(update_and_send, 'interval', minutes=10)
    scheduler.start()
