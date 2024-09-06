<?php

// this site will be hosted by reverse proxy so for some links we need to know
// the path we're actually hosted on
$host_site_actual_path = "/";
if (isset($_SERVER['HTTP_X_FORWARDED_SERVER'])) {
	// check that we're behind a proxy
	$host_site_actual_path = "/research/gfm-viewer/";
}


/**
 * Generate the navigation bar for all our pages
 */
function getHeader($this_page) {
	global $host_site_actual_path;

        $dirbase=basename(__DIR__);
        $bcwd=basename(getcwd());

        if( $bcwd == $dirbase) {
	$all_pages = [
		"../../viewer.php" => "Viewer",
		"guide.php" => "User Guide",
		"disclaimer.php" => "Disclaimer",
		"contact.php" => "Contact"
	];
        $scec_img_png="../../img/sceclogo_transparent.png";
        } else {
	$all_pages = [
		"viewer.php" => "Viewer",
                "site/gfm/guide.php" => "User Guide",
		"site/gfm/disclaimer.php" => "Disclaimer",
		"site/gfm/contact.php" => "Contact"
	];
        $scec_img_png="img/sceclogo_transparent.png";
        }

	$page_links_html = "";
	foreach($all_pages as $url => $page) {
		$active = "";
		if (stripos($page, $this_page) !== false) {
			$active = "active";
		}
                /* prepend site/gfm if at top level */
		$page_links_html .= <<<_END
		<li class="nav-item $active">
			<a class="nav-link" href="${url}">${page}</a>
		</li>
_END;
	}
	$header = <<<_END
<div class="banner-container">
    <div class="container top">
        <nav class="navbar navbar-expand-lg navbar-dark  scec-header">
            <a class="navbar-brand" href="$host_site_actual_path"><img class="scec-logo" src=$scec_img_png>
                &nbsp;Geological Framework Model Viewer (Provisional)</a>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                $page_links_html
                </ul>
            </div>
        </nav>
    </div>
</div>
_END;

	return $header;
}


?>
