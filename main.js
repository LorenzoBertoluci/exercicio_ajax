$(document).ready(function () {
    fetchData('LorenzoBertoluci');
});

async function fetchData(username) {
    try {
        const data = await fetchGithubData(username);
        updateProfile(data);
    } catch (error) {
        console.error('Erro ao buscar dados do Github:', error);
    }
}

async function fetchGithubData(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

function updateProfile(data) {
    const profileAvatar = $('.profile-avatar');
    const profileName = $('.profile-name');
    const profileUsername = $('.profile-username');
    const numbersRepositories = $('.numbers-item:nth-child(1)');
    const numbersFollowers = $('.numbers-item:nth-child(2)');
    const numbersFollowing = $('.numbers-item:nth-child(3)');
    const profileLink = $('.profile-link');

    profileAvatar.attr('src', data.avatar_url);
    profileName.text(data.name);
    profileUsername.text(`@${data.login}`);
    numbersRepositories.text(data.public_repos);
    numbersFollowers.text(data.followers);
    numbersFollowing.text(data.following);
    profileLink.attr('href', data.html_url);
}
