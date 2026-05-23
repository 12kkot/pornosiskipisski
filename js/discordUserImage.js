function atualizarPerfilDiscord(userId) {
    const targetUserId = userId || '1109347618733162559';

    fetch(`https://api.lanyard.rest/v1/users/${targetUserId}`)
    .then(response => response.json())
    .then(data => {
        if (!data.success) return;

        const userData = data.data;
        const avatarHash = userData.discord_user.avatar;

        const avatarImg = document.querySelector('.avatarImage');
        if (avatarImg && avatarHash) {
            const ext = avatarHash.startsWith('a_') ? 'gif' : 'png';
            avatarImg.src = `https://cdn.discordapp.com/avatars/${targetUserId}/${avatarHash}.${ext}?size=2048`;
        }

        const decorationImg = document.querySelector('.decoration');
        const decorationData = userData.discord_user.avatar_decoration_data;
        if (decorationImg && decorationData && decorationData.asset) {
            decorationImg.src = `https://cdn.discordapp.com/avatar-decoration-presets/${decorationData.asset}.png`;
            decorationImg.style.display = 'block';
        } else if (decorationImg) {
            decorationImg.style.display = 'none';
        }

        const statusImg = document.querySelector('.discordStatus');
        if (statusImg) {
            switch(userData.discord_status) {
                case 'online': statusImg.src = 'img/online.png'; break;
                case 'idle': statusImg.src = 'img/idle.png'; break;
                case 'dnd': statusImg.src = 'img/dnd.png'; break;
                default: statusImg.src = 'img/offline.png';
            }
        }

        const usernameElement = document.querySelector('.discordUserDiv span');
        if (usernameElement && userData.discord_user.username) {
            usernameElement.textContent = userData.discord_user.global_name || userData.discord_user.username;
        }
    })
    .catch(error => {
        console.error('Lanyard API error:', error);
    });
}

function determinarUsuarioPagina() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('meuperfil') || currentPath.includes('perfil2')) {
        return '682694935631233203';
    }
    return '1109347618733162559';
}

document.addEventListener('DOMContentLoaded', function() {
    const userId = determinarUsuarioPagina();
    atualizarPerfilDiscord(userId);
    setInterval(() => atualizarPerfilDiscord(userId), 15000);
});
