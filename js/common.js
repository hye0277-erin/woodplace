document.addEventListener('DOMContentLoaded', async () => {
    console.log('WOODPLACE UI Script Loaded');

    const includeTargets = document.querySelectorAll('[data-include]');

    if (includeTargets.length) {
        await Promise.all(Array.from(includeTargets).map(async (target) => {
            try {
                const file = target.dataset.include;
                const response = await fetch(file);
                if (!response.ok) throw new Error(`${file} include failed`);
                target.outerHTML = await response.text();
            } catch (error) {
                console.warn(error);
            }
        }));
    }

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
                return;
            }

            window.location.href = `search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
        });
    }

    document.querySelectorAll('.product-card').forEach((card) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a, button, input, select, textarea')) return;
            window.location.href = 'product-detail.html';
        });

        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.target.closest('a, button, input, select, textarea')) return;
            if (e.key !== 'Enter') return;
            window.location.href = 'product-detail.html';
        });
    });

    // 3. 메인 히어로 롤링 배너
    const heroSwiperEl = document.querySelector('.hero-swiper');
    const heroCurrent = document.querySelector('.hero-current');
    const heroTotal = document.querySelector('.hero-total');
    const heroProgress = document.querySelector('.hero-progress');
    const heroAutoplayBtn = document.querySelector('.hero-autoplay-btn');
    const heroAutoplayIcon = heroAutoplayBtn?.querySelector('.material-symbols-outlined');

    if (heroSwiperEl && window.Swiper) {
        const totalSlides = heroSwiperEl.querySelectorAll('.swiper-slide').length;
        let isHeroPlaying = true;

        const restartHeroProgress = () => {
            if (!heroProgress) return;
            heroProgress.classList.remove('is-animating');
            void heroProgress.offsetWidth;
            if (isHeroPlaying) heroProgress.classList.add('is-animating');
        };

        const heroSwiper = new Swiper(heroSwiperEl, {
            loop: true,
            speed: 800,
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            on: {
                init(swiper) {
                    if (heroTotal) heroTotal.textContent = `/${totalSlides}`;
                    if (heroCurrent) heroCurrent.textContent = swiper.realIndex + 1;
                    restartHeroProgress();
                },
                slideChange(swiper) {
                    if (heroCurrent) heroCurrent.textContent = swiper.realIndex + 1;
                    restartHeroProgress();
                },
            },
        });

        heroAutoplayBtn?.addEventListener('click', () => {
            isHeroPlaying = !isHeroPlaying;

            if (isHeroPlaying) {
                heroSwiper.autoplay.start();
                heroAutoplayBtn.setAttribute('aria-label', '배너 자동 재생 일시정지');
                if (heroAutoplayIcon) heroAutoplayIcon.textContent = 'pause';
            } else {
                heroSwiper.autoplay.stop();
                heroAutoplayBtn.setAttribute('aria-label', '배너 자동 재생 시작');
                if (heroAutoplayIcon) heroAutoplayIcon.textContent = 'play_arrow';
            }

            restartHeroProgress();
        });
    }

    // 4. 쇼룸 이미지 마우스 크기 조절
    const showroomGrid = document.querySelector('.showroom-grid');
    const showroomHandle = document.querySelector('.showroom-resize-handle');

    if (showroomGrid && showroomHandle) {
        let startX = 0;
        let startImageWidth = 0;
        let gridWidth = 0;
        let copyWidth = 0;

        const setShowroomColumns = (imageWidth) => {
            const minImageWidth = Math.min(360, gridWidth * 0.34);
            const maxImageWidth = Math.max(minImageWidth, gridWidth - copyWidth - 240);
            const nextImageWidth = Math.min(Math.max(imageWidth, minImageWidth), maxImageWidth);

            showroomGrid.style.gridTemplateColumns = `${copyWidth}px ${nextImageWidth}px minmax(240px, 1fr)`;
        };

        showroomHandle.addEventListener('pointerdown', (e) => {
            if (window.innerWidth <= 1024) return;

            const imageRect = showroomHandle.closest('.showroom-image').getBoundingClientRect();
            const copyRect = showroomGrid.querySelector('.showroom-copy').getBoundingClientRect();
            const gridRect = showroomGrid.getBoundingClientRect();

            startX = e.clientX;
            startImageWidth = imageRect.width;
            gridWidth = gridRect.width;
            copyWidth = copyRect.width;

            showroomGrid.classList.add('is-resizing');
            showroomHandle.setPointerCapture(e.pointerId);
        });

        showroomHandle.addEventListener('pointermove', (e) => {
            if (!showroomGrid.classList.contains('is-resizing')) return;
            setShowroomColumns(startImageWidth + e.clientX - startX);
        });

        showroomHandle.addEventListener('pointerup', (e) => {
            showroomGrid.classList.remove('is-resizing');
            showroomHandle.releasePointerCapture(e.pointerId);
        });

        showroomHandle.addEventListener('pointercancel', (e) => {
            showroomGrid.classList.remove('is-resizing');
            showroomHandle.releasePointerCapture(e.pointerId);
        });

        showroomHandle.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

            const imageWidth = showroomHandle.closest('.showroom-image').getBoundingClientRect().width;
            copyWidth = showroomGrid.querySelector('.showroom-copy').getBoundingClientRect().width;
            gridWidth = showroomGrid.getBoundingClientRect().width;
            setShowroomColumns(imageWidth + (e.key === 'ArrowRight' ? 24 : -24));
        });
    }

    // 5. 장바구니 수량 및 합계 갱신
    const cartItems = document.querySelectorAll('.cart-item[data-price]');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartShipping = document.getElementById('cartShipping');
    const cartTotal = document.getElementById('cartTotal');

    if (cartItems.length && cartSubtotal && cartShipping && cartTotal) {
        const formatPrice = (price) => `${price.toLocaleString('ko-KR')}원`;

        const updateCartSummary = () => {
            let subtotal = 0;
            let shipping = 0;

            cartItems.forEach((item) => {
                const checkbox = item.querySelector('input[type="checkbox"]');
                const quantityInput = item.querySelector('.quantity-input');
                const itemTotal = item.querySelector('.item-total');
                const price = Number(item.dataset.price || 0);
                const itemShipping = Number(item.dataset.shipping || 0);
                const quantity = Math.max(Number(quantityInput?.value || 1), 1);
                const total = price * quantity;

                if (itemTotal) itemTotal.textContent = formatPrice(total);

                if (!checkbox || checkbox.checked) {
                    subtotal += total;
                    shipping += itemShipping;
                }
            });

            cartSubtotal.textContent = formatPrice(subtotal);
            cartShipping.textContent = shipping === 0 ? '무료' : formatPrice(shipping);
            cartTotal.textContent = formatPrice(subtotal + shipping);
        };

        cartItems.forEach((item) => {
            const quantityInput = item.querySelector('.quantity-input');
            const checkbox = item.querySelector('input[type="checkbox"]');

            item.querySelectorAll('.quantity-btn').forEach((button) => {
                button.addEventListener('click', () => {
                    const currentValue = Math.max(Number(quantityInput.value || 1), 1);
                    const nextValue = button.dataset.action === 'increase' ? currentValue + 1 : Math.max(currentValue - 1, 1);
                    quantityInput.value = nextValue;
                    updateCartSummary();
                });
            });

            quantityInput?.addEventListener('change', () => {
                quantityInput.value = Math.max(Number(quantityInput.value || 1), 1);
                updateCartSummary();
            });

            checkbox?.addEventListener('change', updateCartSummary);
        });

        document.querySelector('.cart-list-head input[type="checkbox"]')?.addEventListener('change', (e) => {
            cartItems.forEach((item) => {
                const checkbox = item.querySelector('input[type="checkbox"]');
                if (checkbox) checkbox.checked = e.target.checked;
            });
            updateCartSummary();
        });

        updateCartSummary();
    }

    // 6. 상품 상세 이미지 및 수량 전환
    const detailPage = document.querySelector('.detail-layout[data-product-price]');

    if (detailPage) {
        const detailMainImage = document.getElementById('detailMainImage');
        const detailThumbs = document.querySelectorAll('[data-detail-image]');
        const detailQuantityInput = detailPage.querySelector('.detail-qty-input');
        const detailTotalPrice = document.getElementById('detailTotalPrice');
        const productPrice = Number(detailPage.dataset.productPrice || 0);
        const formatPrice = (price) => `${price.toLocaleString('ko-KR')}원`;

        const updateDetailTotal = () => {
            const quantity = Math.max(Number(detailQuantityInput?.value || 1), 1);
            if (detailQuantityInput) detailQuantityInput.value = quantity;
            if (detailTotalPrice) detailTotalPrice.textContent = formatPrice(productPrice * quantity);
        };

        detailThumbs.forEach((thumb) => {
            thumb.addEventListener('click', () => {
                if (!detailMainImage) return;

                detailMainImage.src = thumb.dataset.detailImage;
                detailMainImage.alt = thumb.dataset.detailAlt || '';
                detailThumbs.forEach((item) => item.classList.remove('is-active'));
                thumb.classList.add('is-active');
            });
        });

        detailPage.querySelectorAll('.detail-qty-btn').forEach((button) => {
            button.addEventListener('click', () => {
                const currentValue = Math.max(Number(detailQuantityInput?.value || 1), 1);
                detailQuantityInput.value = button.dataset.action === 'increase' ? currentValue + 1 : Math.max(currentValue - 1, 1);
                updateDetailTotal();
            });
        });

        detailQuantityInput?.addEventListener('change', updateDetailTotal);
        updateDetailTotal();
    }

    // 7. 브랜드 스토리 썸네일 이미지 전환
    const brandStorySection = document.querySelector('.brand-story-section');

    if (brandStorySection) {
        const storyImage = brandStorySection.querySelector('.story-image-area img');
        const storyThumbs = brandStorySection.querySelectorAll('.story-meta-item[data-story-image]');

        const updateStoryImage = (thumb) => {
            if (!storyImage || !thumb) return;

            storyImage.src = thumb.dataset.storyImage;
            storyImage.alt = thumb.dataset.storyAlt || '';

            storyThumbs.forEach((item) => {
                const isActive = item === thumb;
                item.classList.toggle('is-active', isActive);
                item.setAttribute('aria-pressed', String(isActive));
            });
        };

        if (storyImage && storyThumbs.length) {
            updateStoryImage(brandStorySection.querySelector('.story-meta-item.is-active') || storyThumbs[0]);

            storyThumbs.forEach((thumb) => {
                thumb.addEventListener('click', () => updateStoryImage(thumb));
            });
        }
    }

    // 8. 회원가입 패스워드 일치 확인 프론트 밸리데이션 예시
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
