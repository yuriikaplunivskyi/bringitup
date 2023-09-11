export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindTriggers() {
        this.btns.forEach((btn, i) => {
            try {
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;

                if ( i % 2 == 0) {
                    blockedElem.setAttribute('data-disabled', 'true');
                }
            } catch (e) {};

            btn.addEventListener('click', () => {
                if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
                    this.activeBtn = btn;

                    if ( document.querySelector('iframe #frame')) {
                        this.overlay.style.display = 'flex';
                        if (this.path !== btn.getAttribute('data-url')) {
                            this.btn.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path})
                        }
                    } else {
                        this.path = btn.getAttribute('data-url');
    
                        this.createPlayer(this.path);
                    }
                }
            })
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events:  {
                'onStateChange': this.onPlayerStateChange
            }
        });

        this.overlay.style.display = 'flex';
    }

    onPlayerStateChange(state) {
        try {
            const blockElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
    
            if (state.data == 0) {
                if(blockElem.querySelector('.play__circle').classList.contains('closed')) {
                    blockElem.querySelector('.play__circle').classList.remove('closed');
                    blockElem.querySelector('svg').remove();
                    blockElem.querySelector('.play__circle').appendChild(playBtn);
                    blockElem.querySelector('.play__text').textContent = "play video";
                    blockElem.querySelector('.play__text').classList.remove('attention');
                    blockElem.style.opacity = 1;
                    blockElem.style.filter = 'none';
    
                    blockElem.setAttribute('data-disabled', 'false');
                }
            }
        } catch (e) {};
    }

    init() {
        if (this.btns.length > 0) {
            const tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}