$(document).ready(function () {
    // Toggle menú hamburguesa
    $('#nav-toggle').click(function () {
        $('.nav-list').slideToggle();
        $(this).toggleClass('active');
    });

    // Mostrar submenús con clic solo en móviles
    $('nav ul li a').click(function (e) {
        if ($(window).width() <= 768) {
            const hasDropdown = $(this).siblings('.nav-dropdown').length > 0;

            if (hasDropdown) {
                e.preventDefault(); // No navega
                // Oculta otros submenús abiertos
                $('.nav-dropdown').not($(this).siblings('.nav-dropdown')).slideUp();
                // Toggle del submenú actual
                $(this).siblings('.nav-dropdown').slideToggle();
            } else {
                // Cierra todo si es enlace normal
                $('.nav-list').slideUp();
                $('#nav-toggle').removeClass('active');
            }
        }
    });

    // Cerrar submenú si se hace clic fuera
    $(document).click(function (e) {
        if (!$(e.target).closest('nav').length) {
            $('.nav-dropdown').slideUp();
        }
    });

    // Evita cerrar el submenú si se hace clic dentro
    $('nav ul li').click(function (e) {
        e.stopPropagation();
    });

    let lastScrollTop = 0;
    const navbar = $('.nav-bar');

    $(window).on('scroll', function () {
        const scrollTop = $(this).scrollTop();

        if (scrollTop > lastScrollTop) {
            // Scroll hacia abajo -> oculta navbar
            navbar.css('top', '-100px');
        } else {
            // Scroll hacia arriba -> muestra navbar
            navbar.css('top', '0');
        }

        lastScrollTop = scrollTop;
    });

    // Ejecutar scroll solo si está en pantallas pequeñas
    function bindScrollHandler() {
        if ($(window).width() <= 768) {
            $(window).on('scroll.navbarHide', handleNavbarScroll);
            // Asegura que el menú se oculte al cambiar a móvil
            $('.nav-list').hide();
            $('#nav-toggle').removeClass('active');
            $('.nav-dropdown').hide();
        } else {
            $(window).off('scroll.navbarHide');
            navbar.css('top', '0');

            // Asegura que el menú se muestre al cambiar a escritorio
            $('.nav-list').css('display', 'block');
            $('#nav-toggle').removeClass('active');
            $('.nav-dropdown').removeAttr('style');
        }

    }

    function handleNavbarScroll() {
        const scrollTop = $(window).scrollTop();
    
        if (scrollTop > lastScrollTop) {
            $('.nav-bar').css('top', '-100px');
        } else {
            $('.nav-bar').css('top', '0');
        }
    
        lastScrollTop = scrollTop;
    }
    
    bindScrollHandler();
    $(window).on('resize', bindScrollHandler); // por si  
    



    // Seleccionamos todos los bloques de tipo "info-container-esplora"
    document.querySelectorAll('.info-container-esplora').forEach(container => {
        const image = container.querySelector('.image-section img');
        const imageSection = container.querySelector('.image-section');
        const textSection = container.querySelector('.text-section');

        [imageSection, textSection].forEach(section => {
            section.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05)';
            });
            section.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
            });
        });
    });




});