import requests
from bs4 import BeautifulSoup

class Github:
    def __init__(self,username : str):
        self.username = username

    def scrape_profile(self):
        username = self.username
        url = f"https://github.com/{username}"
        response = requests.get(url)
        response = BeautifulSoup(response.text, "html.parser")
        return response
    
    def get_user_name(self) -> str:
        user_profile = self.scrape_profile()
        try:
            name_element = user_profile.find("span", class_="p-name")
            if name_element:
                name = name_element.get_text().strip()
                return name
            else:
                return "Username not found."
        except Exception as e:
            print(e)
            return "Error: Failed to retrieve the GitHub page."

    def get_profile_pic_url(self) -> str:
        user_profile = self.scrape_profile()
        if 'Not Found' in user_profile.text:
            return f"Username: {self.username} not found!"
        try:
            img_tag = user_profile.find("img", class_="avatar")
            return img_tag['src'] if img_tag.has_attr('src') else f"Invalid image tag: {img_tag}"
        except Exception as e:
            return f"Exception got raised while extracting profile pic for user: {self.username}: {e}"
    
    def get_bio(self) -> str:
        user_profile=self.scrape_profile()
        try:
            bio_element=user_profile.find("div", class_="user-profile-bio")
            if bio_element:
                return bio_element.get_text().strip()
            else:
                return "Bio not found."
        except Exception as ex:
            print(ex)
            return "Error: Failed to retrieve the Github page"
    
    def user_readme(self) -> str:
        try:
            url=f"https://raw.githubusercontent.com/{self.username}/{self.username}/master/README.md"
            response = requests.get(url)
            response = BeautifulSoup(response.text, "html.parser")    
            readme_text=response.get_text()
            readme_text='\n'.join([line for line in readme_text.splitlines() if line.strip()])        
            return readme_text
        except Exception as ex:
            print(ex)
            return "Error: Failed to fetch readme."



        
if __name__ == '__main__':
    github = Github('neokd')
    print(github.user_readme())