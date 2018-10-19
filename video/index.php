<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Hydrogen &mdash; A free HTML5 Template </title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Google Webfonts -->
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,100,500' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>

        <!-- Animate.css -->

        <!-- Icomoon Icon Fonts-->
        <link rel="stylesheet" href="css/icomoon.css">
        <!-- Salvattore -->
        <link rel="stylesheet" href="css/salvattore.css">
        <!-- Theme Style -->
        <link rel="stylesheet" href="css/style.css?v=<?php echo time() ?>">
        <!-- Modernizr JS -->
        <script src="js/modernizr-2.6.2.min.js"></script>
        <!-- FOR IE9 below -->
        <!--[if lt IE 9]>
        <script src="js/respond.min.js"></script>
        <![endif]-->

    </head>
    <body>

        <div id="fh5co-offcanvass">
            <a href="#" class="fh5co-offcanvass-close js-fh5co-offcanvass-close">category <i class="icon-cross"></i> </a>
            <h1 class="fh5co-logo"><a class="navbar-brand" href=index.php">Free Videos</a></h1>
            <ul>
                <li class="active"><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="pricing.html">Pricing</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
            <h3 class="fh5co-lead">Connect with us</h3>
            <p class="fh5co-social-icons">
                <a href="#"><i class="icon-twitter"></i></a>
                <a href="#"><i class="icon-facebook"></i></a>
                <a href="#"><i class="icon-instagram"></i></a>
                <a href="#"><i class="icon-dribbble"></i></a>
                <a href="#"><i class="icon-youtube"></i></a>
            </p>
        </div>
        <header id="fh5co-header" role="banner">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <a href="#" class="fh5co-menu-btn js-fh5co-menu-btn">category <i class="icon-menu"></i></a>
                        <a class="navbar-brand" href="index.html">Free Videos</a>		
                    </div>
                </div>
            </div>
        </header>
        <!-- END .header -->

        <div id="fh5co-main">
            <div class="container">
                <div class="row">
                    <div id="fh5co-board" data-columns>

                        <!--end item-->
                        <?php
                        $json = file_get_contents('list.json');
                        $list = json_decode($json, true);
                        $i=0;
                        foreach ($list as $l) {
                            $i++;
                            ?>

                            <div class="item">
                                <div class="animate-box">
                                    <?php if($i>4){?>
                                    <img class="lazy" src="img/t.png" data-original="<?php echo $l['img']; ?>">
                                    <?php }else{?>
                                    <img src="<?php echo $l['img']; ?>">
                                    <?php }?>
                                    <button class="play-btn">
                                        <i class="icon-controller-play"></i>
                                    </button>
                                </div>
                                <div class="fh5co-desc">

                                    <button class="btn btn-warning btn-sm"><i class="icon-heart"></i><span><?php echo $l['heart']; ?></span></button>
                                    <button class="btn btn-success btn-sm"><i class="icon-download"></i><span><?php echo $l['download']; ?></span> </button>
                                </div>
                            </div>
                        <?php } ?>
                        <!--end item-->


                    </div>
                </div>
            </div>

            <footer id="fh5co-footer">

                <div class="container">
                    <div class="row row-padded">
                        <div class="col-md-12 text-center">
                            <p class="fh5co-social-icons">
                                <a href="#"><i class="icon-twitter"></i></a>
                                <a href="#"><i class="icon-facebook"></i></a>
                                <a href="#"><i class="icon-instagram"></i></a>
                                <a href="#"><i class="icon-dribbble"></i></a>
                                <a href="#"><i class="icon-youtube"></i></a>
                            </p>
                            <p><small>&copy; Hydrogen Free HTML5 Template. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
            <div id="frame">

                <p style="text-align: center;font-size:22px;padding:15px;margin-top:30%;line-height: 1.8;"class="text-info">Registration is free and takes less than 30 seconds (no credit card required). <br>you can watch all videos for free!</p>
                <p style="text-align: center"><button class="btn btn-success" id="signup"> sign up</button></p> 
                <p style="text-align: center;font-size:22px;padding:15px;line-height: 1.8;"class="text-danger">Your age must over 30</p>
                <iframe id="signupFrame" frameborder="no" border="0" src=""></iframe>
                <div class="ifheader">
                    <div style="font-size:16px;width">
                        <span >Sign up to watch all videos for free</span>
                    </div>
                    <div class="" style="">
                        <button class="btn btn-sm btn-warning" id="close" >Close</button>
                    </div>

                </div>
            </div>

            <!-- jQuery -->
            <script src="js/jquery.min.js"></script>
            <script src="js/jquery.lazyload.min.js"></script>
            <script src="js/jquery.scrollstop.min.js"></script>
            <script src="js/salvattore.min.js"></script>
            <!-- Main JS -->
            <script src="js/main.js?v=<?php echo time() ?>"></script>

            <script>
                $(function () {
                    $("img.lazy").lazyload({event: 'scrollstop'});
                    $(".play-btn").click(function () {

                        $("#frame").slideDown();


                    })
                    $("#close").click(function () {
                        $("#frame").slideUp();

                    })

                    $("#signup").click(function () {
                        $(this).text("Loading");
                        $("#signupFrame").show();
                        $("#signupFrame").attr("src", "https://t.cn/EzorT18");

                    })
                });
            </script>


    </body>
</html>
