document.addEventListener('DOMContentLoaded', () => {
    console.log('WOODPLACE UI Script Loaded');

    // 1. 모바일 헤더 메뉴 토글
    const siteHeader = document.querySelector('.site-header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const headerNav = document.querySelector('.header-nav');
    const mobileMenuIcon = mobileMenuBtn?.querySelector('.material-symbols-outlined');

    if (siteHeader && mobileMenuBtn && headerNav) {
        const closeMobileMenu = () => {
            siteHeader.classList.remove('is-menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', '메뉴 열기');
            if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
        };

        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = siteHeader.classList.toggle('is-menu-open');

            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            mobileMenuBtn.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
            if (mobileMenuIcon) mobileMenuIcon.textContent = isOpen ? 'close' : 'menu';
        });

        headerNav.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                closeMobileMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                closeMobileMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }

    // 2. 헤더 검색창 간단 인터랙션 예시
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', (e) => {
            if (!searchInput.value.trim()) {
                e.preventDefault();
                searchInput.focus();
                searchInput.style.borderColor = 'var(--color-brown)';
            }
        });
    }

    // 3. 브랜드 스토리 썸네일 이미지 전환
    const storyImage = document.querySelector('.story-image-area img');
    const storyThumbs = document.querySelectorAll('.story-meta-item[data-story-image]');

    if (storyImage && storyThumbs.length) {
        storyThumbs.forEach((thumb) => {
            thumb.addEventListener('click', () => {
                storyImage.src = thumb.dataset.storyImage;
                storyImage.alt = thumb.dataset.storyAlt || '';

                storyThumbs.forEach((item) => item.classList.remove('is-active'));
                thumb.classList.add('is-active');
            });
        });
    }

    // 4. 회원가입 패스워드 일치 확인 프론트 밸리데이션 예시
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            const password = document.getElementById('joinPw').value;
            const confirmPassword = document.getElementById('joinPwConfirm').value;

            if (password !== confirmPassword) {
                e.preventDefault();
                alert('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
                document.getElementById('joinPwConfirm').focus();
            }
        });
    }
});
