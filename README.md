<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDsS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  
<h1 align="center"><b>Hue v4.0</b></h1>
	<b>Warning This project is still very early in development.</b>

  <p align="center">
    Hue v4 is a continuation of my Hue Project, expanding it to more services such as Minecraft, Steam, And Roblox.
    <br />
    <a href="https://github.com/ItzRock/Hue-v4.0/issues">Report Bug</a>
    ·
    <a href="https://github.com/ItzRock/Hue-v4.0/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Hue v4.0 is a discord bot which allows servers which need to verify the users who are joining their servers with their relevant account, for example: `Garry's mod or other Steam Game community needs to verify that a user is indeed a steam account` or `A Roblox community needs a user to verify as their roblox account` and lastly `A minecraft server needs to verify a user as their minecraft account` The only limitation of this (currently) is you can only have one service enabled per discord server.

Discord js v13 and not v14? Discord.js v14 absolutely sucks it takes simple things and makes it 10x harder by forcing a type or a new enum which you need to import when before it only required a string. Additonally `embed.setColor` requires `0xcode` now? instead of `"#code"` what?

Additionally this bot was designed to work in the Pterodactyl panel so there may be some features which may or may not break without it, I still need to figure out what to add to the readme as I am still working on this and its still very early

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ItzRock/Hue-v4.0.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Clone and fill out the `configuration.toml` file. (refer to the `configuration template.toml` for the most up to date template)
	```toml
	[Client]
  	TOKEN = "SuperSecretToken"
	BOT_ADMINISTRATION = [ 
	"@[USER_ID]",
	]

	[Channels]
	LOGS = "Channel ID"

	[Database]
	URL = "DatabaseURL"
	USERNAME = "DatabaseUsername"
	PASSWORD = "DatabasePassword"

	```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

If you have found a bug or would like a feature the best way to get in contact is using the [Issues](/issues) or [Pull requests](/pulls) tabs on the repo.
For any other questions or concerns unrealated to Hue, via one of the following methods

1. [Twitter: @ItzRock_](https://twitter.com/ItzRock_)

Project Link: [https://github.com/ItzRock/Hue-v4.0](https://github.com/ItzRock/Hue-v4.0)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ItzRock/Hue-v4.0.svg?style=for-the-badge
[contributors-url]: https://github.com/ItzRock/Hue-v4.0/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ItzRock/Hue-v4.0.svg?style=for-the-badge
[forks-url]: https://github.com/ItzRock/Hue-v4.0/network/members
[stars-shield]: https://img.shields.io/github/stars/ItzRock/Hue-v4.0.svg?style=for-the-badge
[stars-url]: https://github.com/ItzRock/Hue-v4.0/stargazers
[issues-shield]: https://img.shields.io/github/issues/ItzRock/Hue-v4.0.svg?style=for-the-badge
[issues-url]: https://github.com/ItzRock/Hue-v4.0/issues
[license-shield]: https://img.shields.io/github/license/ItzRock/Hue-v4.0.svg?style=for-the-badge
[license-url]: https://github.com/ItzRock/Hue-v4.0/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
