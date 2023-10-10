# 🛠 Development Environment Setup for the P-Tech Blog

Streamline your development process for the Philico P-Tech blog using Visual Studio Code by following this guide.

## 1. Initialize the Workspace

- **Download & Install**: Begin by downloading and installing [Visual Studio Code](https://code.visualstudio.com/).

- **Clone the Repository**: 
  1. Launch Visual Studio Code.
  2. Opt for "Clone Repository" from the welcome screen or select it from the "Source Control" tab.
    ![Clone the Repository](clone_repo.png)

  3. Input the URL for the [P-Tech Blog GitHub Repository](https://github.com/philico-tech/ptech-blog.git) and designate a suitable location on your system.
  4. Upon successful cloning, you can access the repository directly within Visual Studio Code.

## 2. Activate the Local Server

  1. Use the terminal to navigate to the repository's location.

  2. Run the following command to initialize a local server:

     ```bash
     hugo server
     ```

  3. Post execution, the blog will be available for viewing in your preferred browser.
     ![screenshot](https://github.com/philico-tech/ptech-blog/assets/138483812/b8c7fb07-0f17-40dd-9ca5-0f3c61744e87)

## 📌 Notes

- **Framework**: The Philico P-Tech blog has been developed using HUGO, a renowned open-source static site generator. To delve deeper into HUGO's capabilities, head over to [gohugo.io](https://gohugo.io).
- **Deployment**: Follow these [steps](https://gohugo.io/hosting-and-deployment/hosting-on-github/) to publish the blog via GitHub Pages.
- **Hugo Theme**: This blog has been developed with the Hugo Theme [Puppet](https://themes.gohugo.io/themes/hugo-theme-puppet/)
