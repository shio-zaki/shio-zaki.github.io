import requests, json

from bs4 import BeautifulSoup


r = requests.get("https://www.kyoukaikenpo.or.jp/g7/cat330/sb3150/r03/r3ryougakuhyou3gatukara/")

soup = BeautifulSoup(r.content)

prefs = soup.find("tbody")

a_tags = prefs.find_all("a")

urls={}
for x in range(47):
    urls[a_tags[x].text] = "https://www.kyoukaikenpo.or.jp" + a_tags[x]["href"]

print(json.dumps(urls, ensure_ascii=False, indent=4))