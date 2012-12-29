/*
** Cookie Consent Script
** (c) George Buckingham (gbuckingham89)
** https://github.com/gbuckingham89/cookieconsent
*/

/*
** Define global var's
*/
var gb_cc_body_tp = "";

/*
** Define get cookie function
*/
function gb_cc_get_cookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if(x==c_name) {
		    return unescape(y);
	    }
    }
}

/*
** Define set cookie function
*/
function gb_cc_set_cookie(c_name, value, exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

/*
** Define get style function
*/
function gb_cc_get_style(el, styleProp) {
	var x = document.getElementsByTagName(el)[0];
	if (x.currentStyle) {
		var y = x.currentStyle[styleProp];
	}
	else if (window.getComputedStyle) {
		var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
	}
	return y;
}

/*
** Define cookie consent function
*/
function gb_cc() {

	// Get the head and body of the page
	var page_head = document.getElementsByTagName('head')[0];
	var page_body = document.getElementsByTagName('body')[0];
	
	// Include stylesheet
	var stylesheet = document.createElement('link');
	stylesheet.rel = 'stylesheet';
	stylesheet.href = 'http://cookieconsent.georgebuckingham.com/cookieconsent.min.css';
	page_head.appendChild(stylesheet);
	
	// Get the cookie value
	var gb_cc_cookie_cal = gb_cc_get_cookie("gb_cc");
	
	// If the cookie doesn't exist
	if(gb_cc_cookie_cal==null || gb_cc_cookie_cal=="" || gb_cc_cookie_cal!="1") {
		
		// Define info bar content
		var info_bar_content = '<p>This site uses cookies. By continuing to browse this site you consent to their use. <a href="#" title="Hide This Message" class="gb_cc_close" onclick="gb_cc_close(); return false;">Hide This Message</a> <a href="#" title="More Info" onclick="gb_cc_more_info(); return false;">More Info</a></p><div id="gb_cc_more_info"><p><strong>What are cookies?</strong><br />Cookies are small text files that are stored by your web browser that allow websites to store and retrieve data. Find out more here: <a href="http://www.bbc.co.uk/privacy/cookies/about/" title="BBC: What is a cookie?" target=_"blank">BBC: What is a cookie?</a>.</p><p><strong>How we use cookies</strong><br />The site uses Google Analytics to gain anonymous data about people using the site which helps us to improve user experience (this sets 4 cookies __utma, __utmb, __utmc, __utmz). We may also set other cookies that are essential for our website to function. If third party content and features are included, the third party may also set their own cookies, however they can\'t access the cookies we set, and vice versa. By browsing this website you consent to the use of cookies.</p></div>';
		
		// Create the infobar and add to the body
		var info_bar = document.createElement('div');
		info_bar.id = "gb_cc_bar";
		page_body.appendChild(info_bar);
		
		// Add the infobar content to the new div
		var info_bar = document.getElementById('gb_cc_bar');
		info_bar.innerHTML = info_bar_content;
						
		// Get the current body padding and calculate new
		gb_cc_body_tp = gb_cc_get_style('body', 'padding-top');
		var gb_cc_body_tp_new = gb_cc_body_tp.replace('px', '');
		gb_cc_body_tp_new = parseInt(gb_cc_body_tp_new) + 41;
		gb_cc_body_tp_new = gb_cc_body_tp_new.toString() + 'px';		
		
		// Set new body padding
		document.getElementsByTagName('body')[0].style.paddingTop = gb_cc_body_tp_new;	
				
	}
		
}

/*
** Define close info window function
*/
function gb_cc_close() {
	
	// Set the cookie
	gb_cc_set_cookie('gb_cc', '1', 365);
	
	// Hide the info bar
	var info_bar = document.getElementById('gb_cc_bar');
	info_bar.style.display = 'none';
	
	// Reset the boddy passing
	document.getElementsByTagName('body')[0].style.paddingTop = gb_cc_body_tp;
	
}

/*
** Define toggle more info function
*/
function gb_cc_more_info() {
	
	// Get the more info div
	var more_info = document.getElementById('gb_cc_more_info');
	
	// If the div is already displayed - hide it!
	if(more_info.style.display=="block") {
		more_info.style.display = "none";
	}
	
	// If the div is not displayed - show it!
	else {
		more_info.style.display = "block";
	}
	
}

/*
** Fire the cookie consent function when the window loads
*/
window.onload=gb_cc;