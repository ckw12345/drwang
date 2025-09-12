//Error handling Constants 

reg_error_terms 			= "Please accept terms and conditions";

reg_error_interest			= "Please choose one option";

reg_error_publicsector			= "Please choose one option";

reg_error_textfield3			= "Please enter the purchase date";

reg_error_textfield8 			= "Please select one";

reg_error_textfield7 			= "Please select one";

reg_error_citylocation   		= "Please select location";

reg_error_textfield1      		= "Please select one";

reg_error_textfield1_error 		= "Please select one";

reg_error_textfield2      		= "Please enter your second answer";

reg_error_textfield2_error 		= "Please enter correct correct second answer";

reg_error_first_name      		= "* First Name is a required field";

reg_error_plan_name      		= "* Choose a Plan is a required field";

reg_error_inventory      		= "* Inventory Size is a required field";

reg_error_first_name_error 		= "Please enter correct first name";

reg_error_last_name      		= "* Last Name is a required field";

reg_error_last_name_error 		= "Please enter correct last name";

reg_error_company				= "Please enter company name";

reg_error_company_error			= "Please enter correct company name";

reg_error_address1				= "Please enter your address";

reg_error_address1_error		= "Please enter correct business address";

reg_error_country				= "Please select country";

reg_error_city					= "Please enter city";

reg_error_city_error			= "Please enter correct city";

reg_error_state					= "Please select state";

reg_error_state1				= "Please enter state";

reg_error_state1_error			= "Please enter correct state";

reg_error_zip					= "Please enter zip/postal code";

reg_error_zip_error				= "Please enter correct zip/postal code";

reg_error_phone					= "* Phone Number is a required field";

reg_error_phone_error			= "* Please enter a valid telephone number";

reg_error_email_empty    		= "* Email is a required field";

reg_error_email_not_valid 		= "* Please enter a valid email address";

reg_error_DescribesOther    	= "Please enter best describes option";

reg_error_DescribesOther_error 	= "Please enter correct best describes option";

reg_error_OtherIndustry     	= "Please enter other industry";

reg_error_OtherIndustry_error  	= "Please enter correct other industry";

reg_error_OtherDepartment  		= "Please enter your department name";

reg_error_OtherDepartment_error = "Please enter your correct department name";

reg_error_BusinessOther     	= "Please enter your role";

reg_error_BusinessOther_error  	= "Please enter your correct role";

reg_error_OtherInterest     	= "Please enter your interest";

reg_error_OtherInterest_error  	= "Please enter your correct interest";

reg_error_title		= "Please enter job title";

reg_error_title		= "Please enter job title";

var reg_error_department_error = "Please enter correct title name";

var reg_error_usereseller		= "Please enter your answer";

var reg_error_reseller		= "Please select your answer";

function getLabelForId(id) {

    var label, labels = document.getElementsByTagName('label');

    for (var i = 0; (label = labels[i]); i++) {

        if (label.htmlFor == id) {

            return label;

        }

    }

    return false;

}

function checkRequired(id) {

    var formfield = document.getElementById(id);

    var label = getLabelForId(id);

    if (formfield.value.length == 0) {

        label.className = 'problem';

    } else {

        label.className = 'completed';

    }

}

function checkRequired1(id,name) {

    var formfield = document.getElementById(id);

    var label = getLabelForId(id);

    if (formfield.value.length == 0) {

        label.className = '';/*problem*/

        formfield.style.border='1px solid #7F9DB9';/*#c00*/

    } else {

        label.className = 'completed';

        formfield.style.border='1px solid #0c0';

    }

}

function addEventOnFocus(obj){

	if(obj!=null){

		addEvent(obj, 'focus', oninputfocus);

	}

}

function addEvent(obj, evType, fn){

    if (obj.addEventListener){

        obj.addEventListener(evType, fn, true);

        return true;

    } else if (obj.attachEvent){

        var r = obj.attachEvent("on"+evType, fn);

        return r;

    } else {

        return false;

    }

}

function oninputfocus(e) {

    /* Cookie-cutter code to find the source of the event */

    if (typeof e == 'undefined') {

        var e = window.event;

    }

    var source;

    if (typeof e.target != 'undefined') {

        source = e.target;

    } else if (typeof e.srcElement != 'undefined') {

        source = e.srcElement;

    } else {

        return;

    }

    /* End cookie-cutter code */

    source.style.border='1px solid #c00';

}

window.onload=function(){

init_box_msg_fields();

getQueryVariable();

//first_name.focus();

}

function zipcheck()

{

if(country.value=="United States")

{

	zip_label.className = 'required';

}

}

	

function isNumberInput(event) 

{

  var key, keyChar;

  if (window.event)

    key = window.event.keyCode;

  else if (event)

    key = event.which;

  else

    return true;

  // Check for special characters like backspace

  if (key == null || key == 0 || key == 8 || key == 13 || key == 27)

    return true;

  // Check to see if it's a number

  keyChar =  String.fromCharCode(key);

  if (/\d/.test(keyChar)) 

    {

     window.status = "";

     return true;

    } 

  else 

   {

    window.status = "Field accepts numbers only.";

    return false;

   }

}

var specialChars 	  = /[\(\)\<\>\,\'\.\~\`\|\?\}\{\/\!\@\#\$\%\^\&\*\_\+\-\=\;\:\\\"\[\]]/ ; // Used to check special characters for all

var specialCharsZip 	  = /[\<\>\,\'\~\`\|\?\}\{\/\!\@\#\$\%\^\&\*\_\+\=\;\:\\\"\[\]]/ ; // Used to check special characters for all

var specialCharsLastName 	  = /[\(\)\<\>\,\'\~\`\|\?\}\{\/\!\@\#\$\%\^\&\*\_\+\=\;\:\\\"\[\]]/ ; // Used to check special characters for last name

var specialCharsBusinessTitle 	  = /[\(\)\<\>\'\~\`\|\?\}\{\/\!\@\#\$\%\^\*\_\+\-\=\;\:\\\"\[\]]/ ; // Used to check special characters for all

var specialCharsAll = /[\<\>\,\'\`\}\{\|\~\?\!\@\#\$\%\^\*\_\=\;\:\\\"\[\]]/ ;

var specialCharsZip = /[\<\>\,\'\`\}\{\|\~\?\/\!\@\#\$\%\^\&\*\_\=\;\:\\\"\[\]]/ ;

var specialCharsCommon = /[\<\>\`\}\{\|\~\?\!\@\$\%\^\*\_\=\;\:\\\"\[\]]/ ;

var specialCharsAlpha = /[a-zA-Z]/ ;

var specialCharsAlphaNum = /[0-9a-zA-Z]/ ;

var specialCharsAllAnd = /[\<\>\,\'\`\}\{\|\~\?\/\!\@\#\$\%\^\*\_\=\;\:\\\"\[\]]/ ;

var specialCharsPhone = /[\<\>\'\`\}\{\|\~\?\/\!\@\#\$\%\^\&\*\_\=\;\:\\\"\[\]]/ ; // Used to check special characters for phone

var specialCharsPlus = /[+]{2,3}/;

var specialCharsBrack = /[(]{2,3}/;

var specialCharsBrackB = /[)]{2,3}/;

var specialCharsDash = /[-]{2,3}/;

var specialCharsDot = /[.]{2,3}/;

var specialCharsColon = /[:]{2,3}/;

var specialCharsAnd = /[&]{2,3}/;

var specialCharsCama = /[,]{2,3}/;

var specialCharsPostS = /[']{2,3}/;

var specialCharsHash = /[#]{2,3}/;

var specialCharsFslash = /[\/]{2,3}/;var specialChars 	  = /[\(\)\<\>\,\'\.\~\`\|\?\}\{\/\!\@\#\$\%\^\&\*\_\+\-\=\;\:\\\"\[\]]/ ; // Used to check special characters for all

var specialCharsLastName 	  = /[\(\)\<\>\,\'\~\`\|\?\}\{\/\!\@\#\$\%\^\&\*\_\+\=\;\:\\\"\[\]]/ ; // Used to check special characters for last name

var specialCharsBusinessTitle 	  = /[\(\)\<\>\'\~\`\|\?\}\{\/\!\@\#\$\%\^\*\_\+\-\=\;\:\\\"\[\]]/ ; // Used to check special characters for all

var specialCharsAll = /[\<\>\,\'\`\}\{\|\~\?\!\@\#\$\%\^\*\_\=\;\:\\\"\[\]]/ ;

var specialCharsZip = /[\<\>\,\'\`\}\{\|\~\?\/\!\@\#\$\%\^\&\*\_\=\;\:\\\"\[\]]/ ;

var specialCharsCommon = /[\<\>\`\}\{\|\~\?\!\@\$\%\^\*\_\=\;\:\\\"\[\]]/ ;

var specialCharsAlpha = /[a-zA-Z]/ ;

var specialCharsAlphaNum = /[0-9a-zA-Z]/ ;

var specialCharsAllAnd = /[\<\>\,\'\`\}\{\|\~\?\/\!\@\#\$\%\^\*\_\=\;\:\\\"\[\]]/ ;

var specialCharsPhone = /[\<\>\'\`\}\{\|\~\?\/\!\@\#\$\%\^\&\*\_\=\;\:\\\"\[\]]/ ; // Used to check special characters for phone

var specialCharsPlus = /[+]{2,3}/;

var specialCharsBrack = /[(]{2,3}/;

var specialCharsBrackB = /[)]{2,3}/;

var specialCharsDash = /[-]{2,3}/;

var specialCharsDot = /[.]{2,3}/;

var specialCharsColon = /[:]{2,3}/;

var specialCharsAnd = /[&]{2,3}/;

var specialCharsCama = /[,]{2,3}/;

var specialCharsPostS = /[']{2,3}/;

var specialCharsHash = /[#]{2,3}/;

var specialCharsFslash = /[\/]{2,3}/;

var interest;

var box_interest;

var msg_interest;

//textfield2

var textfield2;

//textfield8

var textfield8;

var textfield8_label;

var box_textfield8;

var msg_textfield8;

//textfield7

var textfield7;

var textfield7_label;

var box_textfield7;

var msg_textfield7;

//textfield3

var textfield3;

var textfield3_label;

var box_textfield3;

var msg_textfield3;

//textfield5

var publicsector;

var publicsector_label;

var box_publicsector;

var msg_publicsector;

//textfield1

var textfield1;

var textfield1_label;

var box_textfield1;

var msg_textfield1;

//q1

var textfield2;

var textfield2_label;

var box_textfield2;

var msg_textfield2;

//first_name

var first_name;

var first_name_label;

var box_first_name;

var msg_first_name;

//plan_name

var plan_name;

var plan_name_label;

var box_plan_name;

var msg_plan_name;

//inventory

var inventory;

var inventory_label;

var box_inventory;

var msg_inventory;

//location

var citylocation;

var citylocation_label;

var box_citylocation;

var msg_citylocation;

//last_name

var last_name;

var last_name_label;

var box_last_name;

var msg_last_name;

//department1

var department1;

var department1_label;

var box_department1;

var msg_department1;

//Deapartment

var title;

var title_label;

var box_title;

var msg_title;

//Company

var company;

var company_label;

var box_company;

var msg_company;

//address1

var address1;

var address1_label;

var box_address1;

var msg_address1;

//Country

var country;

var country_label;

var box_country;

var msg_country;

//City

var city;

var city_label;

var box_city;

var msg_city;

//State

var state;

var state1;

var state_label;

var box_state;

var msg_state;

//Zip

var zip;

var zip_label;

var box_zip;

var msg_zip;

//Telephone

var phone;

var phone_label;

var box_phone;

var msg_phone;

//Email

var email;

var email_label;

var box_email;

var msg_email;

//usereseller

var usereseller;

var usereseller_label;

var box_usereseller;

var msg_usereseller;

//reseller

var reseller;

var reseller_label;

var box_reseller;

var msg_reseller;

var textfield6;

function init_box_msg_fields()

{

	terms = document.getElementsByName("terms");

	validations = document.getElementsByName("validations");

	

	interest = document.getElementsByName("interest");

	box_interest =  document.getElementById('box_interest');

	msg_interest = document.getElementById('msg_interest');

	

	//textfield7

	publicsector = document.getElementsByName("publicsector");

	publicsector_label = getLabelForId('publicsector');

	box_publicsector =  document.getElementById('box_publicsector');

	msg_publicsector = document.getElementById('msg_publicsector');

		//textfield1

	textfield2 = document.getElementById("textfield2");

	

	//textfield8

	textfield8 = document.getElementsByName("textfield8");

	textfield8_label = getLabelForId('textfield8');

	box_textfield8 = document.getElementById('box_textfield8');

	msg_textfield8 = document.getElementById('msg_textfield8');

	

	

	

	

	//textfield7

	textfield7 = document.getElementsByName("textfield7");

	textfield7_label = getLabelForId('textfield7');

	box_textfield7 = document.getElementById('box_textfield7');

	msg_textfield7 = document.getElementById('msg_textfield7');

	//textfield3

	textfield3 = document.getElementById('textfield3');

	textfield3_label = getLabelForId('textfield3');

	box_textfield3= document.getElementById('box_textfield3');

	msg_textfield3 = document.getElementById('msg_textfield3');

	 //textfield1

	textfield1 = document.getElementsByName('textfield1');

	textfield1_label = getLabelForId('textfield1');

	box_textfield1 = document.getElementById('box_textfield1');

	msg_textfield1 = document.getElementById('msg_textfield1');

	

	

	//fist_name

	first_name = document.getElementById('first_name');

	first_name_label = getLabelForId('first_name');

	box_first_name = document.getElementById('box_first_name');

	msg_first_name = document.getElementById('msg_first_name');

	//plan_name

	plan_name = document.getElementById('plan_name');

	first_name_label = getLabelForId('plan_name');

	box_plan_name = document.getElementById('box_plan_name');

	msg_plan_name = document.getElementById('msg_plan_name');

	//Inventory

	inventory = document.getElementById('inventory');

	inventory_label = getLabelForId('inventory');

	box_inventory = document.getElementById('box_inventory');

	msg_inventory = document.getElementById('msg_inventory');

	//last_name

	last_name = document.getElementById('last_name');

	last_name_label = getLabelForId('last_name');

	box_last_name= document.getElementById('box_last_name');

	msg_last_name = document.getElementById('msg_last_name');

	//title

	title = document.getElementById('title');

	title_label = getLabelForId('title');

	box_title = document.getElementById('box_title');

	msg_title = document.getElementById('msg_title');	

	

	//Department1

	department1 = document.getElementById('department1');

	department1_label = getLabelForId('department1');

	box_department1 = document.getElementById('box_department1');

	msg_department1 = document.getElementById('msg_department1');	

	

	//company

	company = document.getElementById('company');

	company_label = getLabelForId('company');

	box_company= document.getElementById('box_company');

	msg_company = document.getElementById('msg_company');

	//location

	citylocation = document.getElementById('textfield10');

	citylocation_label = getLabelForId('textfield10');

	box_citylocation = document.getElementById('box_citylocation');

	msg_citylocation = document.getElementById('msg_citylocation');

	//address1

	address1 = document.getElementById('address1');

	address1_label = getLabelForId('address1');

	box_address1 = document.getElementById('box_address1');

	msg_address1 = document.getElementById('msg_address1');	

	//country

	country = document.getElementById('country');

	country_label = getLabelForId('country');

	box_country= document.getElementById('box_country');

	msg_country = document.getElementById('msg_country');

	//city

	city = document.getElementById('city');

	city_label = getLabelForId('city');

	box_city = document.getElementById('box_city');

	msg_city = document.getElementById('msg_city');

	//State

	state = document.getElementById('state');

	state1 = document.getElementById('state1');

	state2 = document.getElementById('state2');

	state_label = getLabelForId('state');

	box_state = document.getElementById('box_state');

	msg_state = document.getElementById('box_state');	

	//Zip

	zip = document.getElementById('zip');

	zip_label = getLabelForId('zip');

	box_zip = document.getElementById('box_zip');

	msg_zip = document.getElementById('msg_zip');	

	//telephone

	phone = document.getElementById('phone');

	phone_label = getLabelForId('phone');

	box_phone= document.getElementById('box_phone');

	msg_phone = document.getElementById('msg_phone');

	

	//email

	email = document.getElementById('email');

	email_label = getLabelForId('email');

	box_email= document.getElementById('box_email');

	msg_email = document.getElementById('msg_email');	

	//usereseller

	usereseller = document.getElementById('usereseller');

	usereseller_label = getLabelForId('usereseller');

	box_usereseller = document.getElementById('box_usereseller');

	msg_usereseller = document.getElementById('msg_usereseller');

	

	//reseller

	reseller = document.getElementById('reseller');

	reseller_label = getLabelForId('reseller');

	box_reseller = document.getElementById('box_reseller');

	msg_reseller = document.getElementById('msg_reseller');

	

	//OtherInterest

	textfield10Drop = document.getElementById('textfield10Drop');

	textfield10 = document.getElementById('textfield10');

	OtherInterest = document.getElementById('OtherInterest');

	OtherInterest_label = getLabelForId('OtherInterest');

	box_OtherInterest= document.getElementById('box_OtherInterest');

	msg_OtherInterest = document.getElementById('msg_OtherInterest');

	

	

	textfield6 = document.getElementById('textfield6');

}

function trim(s){

  return s.replace(/^\s+|\s+$/, '');

}

function checkRadio() {

		var i = 0;

		var position=0;

		var selected=false;

		for (i = 0; i < textfield8.length; i++)

		{

			if (textfield8[i].checked)

			{	

				position = i;

				i = textfield8.length + 1;

				selected=true;

			}

		}

		if (!selected)

		{

			textfield8_label.className = 'problem';

			box_textfield8.style.display     = 'block';

			msg_textfield8.innerHTML         = reg_error_textfield8;

			return false;			

		}

		else{

			textfield8_label.className = 'completed';

			textfield8[position].style.border='1px solid #0C0';

			box_textfield8.style.display     = 'none';

			return true;

		}

}

function checkTitle() {

	if (!title.disabled) {

		var digits = title.value.replace(/[^0-9]/ig, '');

	    if (trim(title.value).length == 0 || trim(title.value).length < 1)

	    {

		title.style.border='1px solid #c00';

		title_label.className = 'problem';

		box_title.style.display     = 'block';

		msg_title.innerHTML         = reg_error_title

		return false;

	    }

	    else {

		title_label.className = 'completed';

		title.style.border='1px solid #0C0';

		box_title.style.display     = 'none';

		return true;

	    }

	}

}



function checTerms() {

		var i = 0;

		var position=0;

		var selected=false;

		for (i = 0; i < terms.length; i++)

		{

			if (terms[i].checked)

			{	

				position = i;

				i = terms.length + 1;

				selected=true;

			}

		}

		if (!selected)

		{

			alert(reg_error_terms);

			return false;			

		}

		else{

			return true;

		}

}





function checkq1() {

		var i = 0;

		var position=0;

		var selected=false;

		for (i = 0; i < textfield1.length; i++)

		{

			if (textfield1[i].checked)

			{	

				position = i;

				i = textfield1.length + 1;

				selected=true;

			}

		}

		if (!selected)

		{

			alert(reg_error_textfield1);

			return false;			

		}

		else{

			return true;

		}

}

function checkq2() {

	if (!textfield2.disabled) {

		var digits = textfield2.value.replace(/[^0-9]/ig, '');

	    if (trim(textfield2.value).length == 0 || trim(textfield2.value).length < 1)

	    {

		textfield2.style.border='1px solid #c00';

		textfield2_label.className = 'problem';

		box_textfield2.style.display     = 'block';

		msg_textfield2.innerHTML         = reg_error_textfield2

		return false;

	    }

	    else {

		textfield2_label.className = 'completed';

		textfield2.style.border='1px solid #0C0';

		box_textfield2.style.display     = 'none';

		return true;

	    }

    	}

}

function checkFirstName() {

	if (!first_name.disabled) {

		var digits = first_name.value.replace(/[^0-9]/ig, '');

	    if (trim(first_name.value).length == 0 || trim(first_name.value).length < 1)

	    {

		first_name.style.border='1px solid #c00';

		$('.validations').html(reg_error_first_name);

		return false;

	    }

	    else {

		first_name.style.border='1px solid #0C0';

		return true;

	    }

    	}

}

function checkLastName() {

	if (!last_name.disabled) {

		var digits = last_name.value.replace(/[^0-9]/ig, '');

	    if (trim(last_name.value).length == 0 || trim(last_name.value).length < 1)

	    {

			last_name.style.border='1px solid #c00';

			$('.validations').html(reg_error_last_name);

			return false;

	    }else {

			last_name.style.border='1px solid #0C0';

			return true;

	    }

    }

}





function checkStreetAddress1() {

	if (!address1.disabled) {

	    if (trim(address1.value).length == 0 || trim(address1.value).length < 1)

	    {

		address1.style.border='1px solid #c00';

		alert(reg_error_address1)

		return false;

	    }

		else

		{

		address1.style.border='1px solid #0C0';

		return true;

	    }

   		}

}

function checkCity() {

	if (!city.disabled) {

	    if (trim(city.value).length == 0 || trim(city.value).length < 1)

	    {

		city.style.border='1px solid #c00';

		alert(reg_error_city)

		return false;

	    }

		else

		{

		city.style.border='1px solid #0C0';

		return true;

	    }

   		}

}

function checkContry1() {

	var country = document.INPUT_FORM.country;

	var state = document.getElementById('state');

	var state1 = document.getElementById('state1');

	var statelen = document.getElementById('state').length;

	if (country.value == "")

	{

		document.getElementById('state1').disabled = true;

		document.getElementById('state1').value = "Please select a country first";

		return true;

	}

	else

	{

		if (statelen == 0)

		{

			document.getElementById('state1').disabled = false;

			document.getElementById('state1').value = "";

		}

		else

		{

			document.getElementById('state1').disabled = true;

			document.getElementById('state1').value = "Please select a country first";

		}

	}

}

function checkCountry() {

	//country

	var country = document.INPUT_FORM.country;

	var state = document.getElementById('state');

	var state1 = document.getElementById('state1');

	if (!country.disabled) {

		if (country.value.length == 0) {

			country.style.border = '1px solid #c00';

			alert(reg_error_country);

			return false;

		} else {

			country.style.border = '1px solid #0C0';

			return true;

		}

	}

}



function checkPlanName() {

	if (!plan_name.disabled) {

		if (plan_name.value.length == 0) {

			plan_name.style.border = '1px solid #c00';

			$('.validations').html(reg_error_plan_name);

			return false;

		} else {

			plan_name.style.border = '1px solid #0C0';

			return true;

		}

	}

}



function checkInventory() {

	if (!inventory.disabled) {

		if (inventory.value.length == 0) {

			inventory.style.border = '1px solid #c00';

			$('.validations').html(reg_error_inventory);

			return false;

		} else {

			inventory.style.border = '1px solid #0C0';

			return true;

		}

	}

}



function checkState() {

	if (!state.disabled) {

		if (state.value.length == 0 || state.value == "Please Select One")

		{ 

			state.style.border='1px solid #c00';

			alert(reg_error_state);

			return false;

		}

		else{

			state.style.border='1px solid #0C0';

			return true;

		}

	}

	else

	{

		return true;

	}

}

function checkState1() {

	if (!state1.disabled) {

		var digitsstate1 = state1.value.replace(/[^0-9]/ig, '');

	    if (trim(state1.value).length == 0 || state1.value == 'Select a country first' &&  trim(state1.value).length < 1)

	    {

		state1.style.border='1px solid #c00'

		alert(reg_error_state1);

		return false;

	    }

	    else {

		state1.style.border='1px solid #0C0';

		return true;

	    }

   		}

	else

	{

		return true;

	}

}

function checkZip() {

	if (trim(zip.value).length == 0 || trim(zip.value).length <= 3 )

	    {

		zip.style.border='1px solid #c00';

		alert(reg_error_zip);

		return false;

	    }

	    else if (zip.value.match(specialCharsZip))

	    { 

		zip.style.border='1px solid #c00';

		alert(reg_error_zip_error);

		return false;

	    }

	    else {

		zip.style.border='1px solid #0C0';

		return true;

	    }

	}

function checkPhone() {

	if (!phone.disabled) {

		var digitsPhone = phone.value.replace(/[^a-zA-Z]/ig, '');

	    if (trim(phone.value).length == 0 || trim(phone.value).length < 5)

	    {

		phone.style.border='1px solid #c00';

		$('.validations').html(reg_error_phone);

		return false;

	    }

	    else if (digitsPhone || phone.value.match(specialCharsPhone) || phone.value.match(specialCharsPlus) || phone.value.match(specialCharsBrack) || phone.value.match(specialCharsBrackB) || phone.value.match(specialCharsDash) || phone.value.match(specialCharsCama) || phone.value.match(specialCharsDot))

	    {

		phone.style.border='1px solid #c00';

		$('.validations').html(reg_error_phone_error);

		return false;

	    }

	    else {

		phone.style.border='1px solid #0C0';

		return true;

	    }

   		}

}

function checkEmail() {

	if (!email.disabled) {

	    if (email.value == "")

	    {

		email.style.border='1px solid #c00';

		$('.validations').html(reg_error_email_empty);

		return false;

	    }

	    else if (email.value != "" && !email.value.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$/))

	    { 

		email.style.border='1px solid #c00';

		$('.validations').html(reg_error_email_not_valid);

		return false;

	    }

	    else {

		email.style.border='1px solid #0C0';

		return true;

	    }

   	}

}

function checkyes()

{ 

if (document.getElementById('customer').checked == true)

{

	document.getElementById('textfield3').value = '';

	document.getElementById('textfield3').disabled = '';

	textfield3_label.className = 'required';

}

else {

	document.getElementById('textfield3').value = '';

	document.getElementById('textfield3').disabled = 'disabled';

	document.getElementById('textfield3').style.border = '1px solid #7F9DB9';

	textfield3_label.className = '';

	box_textfield3.style.display     = 'none';

	

}

}

function checkpublicsector() {

		var i = 0;

		var position=0;

		var selected=false;

		for (i = 0; i < publicsector.length; i++)

		{

			if (publicsector[i].checked)

			{	

				position = i;

				i = publicsector.length + 1;

				selected=true;

			}

		}

		if (!selected)

		{

			box_publicsector.style.display     = 'block';

			document.getElementById('publicsector').className = 'problem';

			msg_publicsector.innerHTML         = reg_error_publicsector;

			return false;			

		}

		else{

			//publicsector[position].style.border='1px solid #0C0';

			document.getElementById('publicsector').className = 'completed';

			box_publicsector.style.display     = 'none';

			return true;

		}

}

function sendpublicsector(){

	if (document.getElementById('texfield1').checked == true)

	{

    document.getElementById('textfield2').value = "/go/federal-contact2/thankyou2.html"

	}

	else

	{

		document.getElementById('textfield2').value = "/go/federal-contact2/thankyou.html" 

}}

function checkq6() {

				var i = 0;

		var position=0;

		var selected=false;

		for (i = 0; i < interest.length; i++)

		{

		if (interest[i].checked)

			{	

				position = i;

				i = interest.length + 1;

			selected=true;

			}

		}

		if (!selected)

		{

			box_interest.style.display     = 'block';

			document.getElementById('interest_label').className = 'problem';

			msg_interest.innerHTML         = reg_error_interest;

			return false;			

		}

		else{

			//interest[position].style.border='1px solid #0C0';

			document.getElementById('interest_label').className = 'completed';

			box_interest.style.display     = 'none';

			return true;

		}

}

function checkq6Data(){

	var interestvalue = new Array();

	if (document.getElementById('interest1').checked == true){

		interestvalue.push(document.getElementById('interest1').value);

	}	

		document.getElementById('textfield6').value = interestvalue;

}

function checkPurchase() {

	if (!textfield3.disabled) {

	    if (trim(textfield3.value).length == 0 || trim(textfield3.value).length < 1)

	    {

		textfield3.style.border='1px solid #c00';

		textfield3_label.className = 'problem';

		box_textfield3.style.display     = 'block';

		msg_textfield3.innerHTML         = reg_error_textfield3;

		return false;

	    }

	    else if (textfield3.value.match(specialCharsDot) || textfield3.value.match(specialCharsPostS) || textfield3.value.match(specialCharsHash) || textfield3.value.match(specialCharsCama) || textfield3.value.match(specialCharsFslash))

	    { 

		textfield3.style.border='1px solid #c00';

		textfield3_label.className = 'wrongFormat';

		box_textfield3.style.display     = 'block';

		msg_textfield3.innerHTML         = reg_error_textfield3_error;

		return false;

	    }

		else

		{

		textfield3_label.className = 'completed';

		textfield3.style.border='1px solid #0C0';

		box_textfield3.style.display     = 'none';

		return true;

	    }

		

   		}

else if (textfield3.disabled)

		{

			return true;

			}

}

						  

var check_form_error_obj = null;

function check_form () {

var obj, e;

try {

	if(!checkFirstName()) {

		first_name.focus();

		return false;

	}else if (!checkEmail()) {

		email.focus();

		return false;

	}else if (!checkPhone()) {

		phone.focus();

		return false;

	}else{

	return true;

	}

} catch (e) {



/*var val_first_name = document.getElementById('first_name').value;

var val_last_name = document.getElementById('first_name').value;

var val_phone = document.getElementById('phone').value;

var val_email = document.getElementById('email').value;





var dataString = 'first_name='+ val_first_name + '&last_name='+ val_last_name + '&email=' + val_email + '&phone=' + val_phone;

//alert (dataString);return false;

$.ajax({

  type: "POST",

  url: "mail.php",

  data: dataString,

  success: function() {

    alert('DONE');

  }

});

return false;*/



	



check_form_error_obj = obj; return false;}

return false;

}

function changezip(){

		if (country.value == "Canada" || country.value == "United Kingdom" || country.value == "United States"){				

				zip_label.className = "required";			

		} else {				

				zip_label.className = "";	

				zip.style.border='1px solid #7f9db9';	

				box_zip.style.display     = 'none';

			}

}

function stateupdate(){

	

	if ( country.value != 'Canada' && country.value != 'United States' ){

		con = country.value;

		state.value = con;

		state1.value = con;

		document.getElementById('dummy-state').style.display = 'block';

		document.getElementById('dummy-state').style.display = 'none';

		state.style.display = 'none';

		state1.style.display = 'none';

				box_state.style.display     = 'none';

				state.disabled = true;

		state1.disabled = true;

	}else {

		document.getElementById('dummy-state').style.display = 'none';

				state.disabled = "";

		state1.disabled = "";

		}

}

var states = new Array();

states[''] = new Array('Please Select One');

states['Afghanistan'] = new Array('Please Select One');

states['Albania'] = new Array('Please Select One');

states['Algeria'] = new Array('Please Select One');

states['American Samoa'] = new Array('Please Select One');

states['Andorra'] = new Array('Please Select One');

states['Angola'] = new Array('Please Select One');

states['Anguilla'] = new Array('Please Select One');

states['Antigua and Barbuda'] = new Array('Please Select One');

states['Argentina'] = new Array('Please Select One');

states['Armenia'] = new Array('Please Select One');

states['Aruba'] = new Array('Please Select One');

states['Australia'] = new Array('Please Select One');

states['Austria'] = new Array('Please Select One');

states['Azerbaijan'] = new Array('Please Select One');

states['Bahamas'] = new Array('Please Select One');

states['Bahrain'] = new Array('Please Select One');

states['Bangladesh'] = new Array('Please Select One');

states['Barbados'] = new Array('Please Select One');

states['Belarus'] = new Array('Please Select One');

states['Belgium'] = new Array('Please Select One');

states['Belize'] = new Array('Please Select One');

states['Benin'] = new Array('Please Select One');

states['Bermuda'] = new Array('Please Select One');

states['Bhutan'] = new Array('Please Select One');

states['Bolivia'] = new Array('Please Select One');

states['Bosnia and Herzegovina'] = new Array('Please Select One');

states['Botswana'] = new Array('Please Select One');

states['Bouvet Island'] = new Array('Please Select One');

states['Brazil'] = new Array('Please Select One');

states['British Indian Ocean Territory'] = new Array('Please Select One');

states['Brunei Darussalam'] = new Array('Please Select One');

states['Bulgaria'] = new Array('Please Select One');

states['Burkina Faso'] = new Array('Please Select One');

states['Burundi'] = new Array('Please Select One');

states['Cambodia'] = new Array('Please Select One');

states['Cameroon'] = new Array('Please Select One');

states['Canada'] = new Array('Please Select One', 'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon Territory');

states['Cape Verde'] = new Array('Please Select One');

states['Cayman Islands'] = new Array('Please Select One');

states['Central African Republic'] = new Array('Please Select One');

states['Chad'] = new Array('Please Select One');

states['Chile'] = new Array('Please Select One');

states['China'] = new Array('Please Select One');

states['Christmas Island'] = new Array('Please Select One');

states['Cocos (Keeling) Islands'] = new Array('Please Select One');

states['Colombia'] = new Array('Please Select One');

states['Comoros'] = new Array('Please Select One');

states['Congo'] = new Array('Please Select One');

states['Cook Islands'] = new Array('Please Select One');

states['Costa Rica'] = new Array('Please Select One');

states['Cote D ivoire'] = new Array('Please Select One');

states['Croatia'] = new Array('Please Select One');

states['Cyprus'] = new Array('Please Select One');

states['Czech Republic'] = new Array('Please Select One');

states['Denmark'] = new Array('Please Select One');

states['Djibouti'] = new Array('Please Select One');

states['Dominica'] = new Array('Please Select One');

states['Dominican Republic'] = new Array('Please Select One');

states['East Timor'] = new Array('Please Select One');

states['Ecuador'] = new Array('Please Select One');

states['Egypt'] = new Array('Please Select One');

states['El Salvador'] = new Array('Please Select One');

states['Equatorial Guinea'] = new Array('Please Select One');

states['Eritrea'] = new Array('Please Select One');

states['Estonia'] = new Array('Please Select One');

states['Ethiopia'] = new Array('Please Select One');

states['Falkland Islands (Malvinas)'] = new Array('Please Select One');

states['Faroe Islands'] = new Array('Please Select One');

states['Fiji'] = new Array('Please Select One');

states['Finland'] = new Array('Please Select One');

states['France'] = new Array('Please Select One');

states['France Metropolitan'] = new Array('Please Select One');

states['French Guiana'] = new Array('Please Select One');

states['French Polynesia'] = new Array('Please Select One');

states['French Southern Territories'] = new Array('Please Select One');

states['Gabon'] = new Array('Please Select One');

states['Gambia'] = new Array('Please Select One');

states['Georgia'] = new Array('Please Select One');

states['Germany'] = new Array('Please Select One');

states['Ghana'] = new Array('Please Select One');

states['Gibraltar'] = new Array('Please Select One');

states['Greece'] = new Array('Please Select One');

states['Greenland'] = new Array('Please Select One');

states['Grenada'] = new Array('Please Select One');

states['Guadeloupe'] = new Array('Please Select One');

states['Guam'] = new Array('Please Select One');

states['Guatemala'] = new Array('Please Select One');

states['Guinea'] = new Array('Please Select One');

states['Guinea-Bissau'] = new Array('Please Select One');

states['Guyana'] = new Array('Please Select One');

states['Haiti'] = new Array('Please Select One');

states['Heard And Mc Donald Islands'] = new Array('Please Select One');

states['Honduras'] = new Array('Please Select One');

states['Hong Kong'] = new Array('Please Select One');

states['Hungary'] = new Array('Please Select One');

states['Iceland'] = new Array('Please Select One');

states['India'] = new Array('Please Select One');

states['Indonesia'] = new Array('Please Select One');

states['Ireland'] = new Array('Please Select One');

states['Israel'] = new Array('Please Select One');

states['Italy'] = new Array('Please Select One');

states['Jamaica'] = new Array('Please Select One');

states['Japan'] = new Array('Please Select One');

states['Jordan'] = new Array('Please Select One');

states['Kazakhstan'] = new Array('Please Select One');

states['Kenya'] = new Array('Please Select One');

states['Kiribati'] = new Array('Please Select One');

states['Kuwait'] = new Array('Please Select One');

states['Kyrgyzstan'] = new Array('Please Select One');

states['Lao People s Democratic Republic'] = new Array('Please Select One');

states['Latvia'] = new Array('Please Select One');

states['Lebanon'] = new Array('Please Select One');

states['Lesotho'] = new Array('Please Select One');

states['Liberia'] = new Array('Please Select One');

states['Libyan Arab Jamahiriya'] = new Array('Please Select One');

states['Liechtenstein'] = new Array('Please Select One');

states['Lithuania'] = new Array('Please Select One');

states['Luxembourg'] = new Array('Please Select One');

states['Macau'] = new Array('Please Select One');

states['Macedonia The Former Yugoslav Republic Of'] = new Array('Please Select One');

states['Madagascar'] = new Array('Please Select One');

states['Malawi'] = new Array('Please Select One');

states['Malaysia'] = new Array('Please Select One');

states['Maldives'] = new Array('Please Select One');

states['Mali'] = new Array('Please Select One');

states['Malta'] = new Array('Please Select One');

states['Marshall Islands'] = new Array('Please Select One');

states['Martinique'] = new Array('Please Select One');

states['Mauritania'] = new Array('Please Select One');

states['Mauritius'] = new Array('Please Select One');

states['Mayotte'] = new Array('Please Select One');

states['Mexico'] = new Array('Please Select One', 'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Distrito Federal', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Mexico', 'Michoacan', 'Morelos', 'Nayanit', 'Nuevo Leon', 'Oaxaca', 'Puebla', 'Queretaro', 'Quintana Roo', 'San Luis Potosi', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatan', 'Zacatecas');

states['Micronesia'] = new Array('Please Select One');

states['Moldova Republic Of'] = new Array('Please Select One');

states['Monaco'] = new Array('Please Select One');

states['Mongolia'] = new Array('Please Select One');

states['Montserrat'] = new Array('Please Select One');

states['Morocco'] = new Array('Please Select One');

states['Mozambique'] = new Array('Please Select One');

states['Myanmar'] = new Array('Please Select One');

states['Namibia'] = new Array('Please Select One');

states['Nauru'] = new Array('Please Select One');

states['Nepal'] = new Array('Please Select One');

states['Netherlands'] = new Array('Please Select One');

states['Netherlands Antilles'] = new Array('Please Select One');

states['New Caledonia'] = new Array('Please Select One');

states['New Zealand'] = new Array('Please Select One');

states['Nicaragua'] = new Array('Please Select One');

states['Niger'] = new Array('Please Select One');

states['Nigeria'] = new Array('Please Select One');

states['Niue'] = new Array('Please Select One');

states['Norfolk Island'] = new Array('Please Select One');

states['North Korea'] = new Array('Please Select One');

states['Northern Mariana Islands'] = new Array('Please Select One');

states['Norway'] = new Array('Please Select One');

states['Oman'] = new Array('Please Select One');

states['Pakistan'] = new Array('Please Select One');

states['Palau'] = new Array('Please Select One');

states['Panama'] = new Array('Please Select One');

states['Papua New Guinea'] = new Array('Please Select One');

states['Paraguay'] = new Array('Please Select One');

states['Peru'] = new Array('Please Select One');

states['Philippines'] = new Array('Please Select One');

states['Pitcairn'] = new Array('Please Select One');

states['Poland'] = new Array('Please Select One');

states['Portugal'] = new Array('Please Select One');

states['Puerto Rico'] = new Array('Please Select One');

states['Qatar'] = new Array('Please Select One');

states['Romania'] = new Array('Please Select One');

states['Russian Federation'] = new Array('Please Select One');

states['Rwanda'] = new Array('Please Select One');

states['Saint Knitts and Nevis'] = new Array('Please Select One');

states['Saint Lucia'] = new Array('Please Select One');

states['Saint Vincent And The Grenadines'] = new Array('Please Select One');

states['Samoa'] = new Array('Please Select One');

states['San Marino'] = new Array('Please Select One');

states['Sao Tome and Principe'] = new Array('Please Select One');

states['Saudi Arabia'] = new Array('Please Select One');

states['Senegal'] = new Array('Please Select One');

states['Seychelles'] = new Array('Please Select One');

states['Sierra Leone'] = new Array('Please Select One');

states['Singapore'] = new Array('Please Select One');

states['Slovakia'] = new Array('Please Select One');

states['Slovenia'] = new Array('Please Select One');

states['Solomon Islands'] = new Array('Please Select One');

states['Somalia'] = new Array('Please Select One');

states['South Africa'] = new Array('Please Select One');

states['South Georgia And The South Sandwich Islands'] = new Array('Please Select One');

states['South Korea'] = new Array('Please Select One');

states['Spain'] = new Array('Please Select One');

states['Sri Lanka'] = new Array('Please Select One');

states['St. Helena'] = new Array('Please Select One');

states['St. Pierre and Miquelon'] = new Array('Please Select One');

states['Sudan'] = new Array('Please Select One');

states['Suriname'] = new Array('Please Select One');

states['Svalbard And Jan Mayen Islands'] = new Array('Please Select One');

states['Swaziland'] = new Array('Please Select One');

states['Sweden'] = new Array('Please Select One');

states['Switzerland'] = new Array('Please Select One');

states['Syrian Arab Republic'] = new Array('Please Select One');

states['Taiwan'] = new Array('Please Select One');

states['Tajikistan'] = new Array('Please Select One');

states['Tanzania United Republic of'] = new Array('Please Select One');

states['Thailand'] = new Array('Please Select One');

states['Togo'] = new Array('Please Select One');

states['Tokelau'] = new Array('Please Select One');

states['Tonga'] = new Array('Please Select One');

states['Trinidad and Tobago'] = new Array('Please Select One');

states['Tunisia'] = new Array('Please Select One');

states['Turkey'] = new Array('Please Select One');

states['Turkmenistan'] = new Array('Please Select One');

states['Turks and Caicos Islands'] = new Array('Please Select One');

states['Tuvalu'] = new Array('Please Select One');

states['Uganda'] = new Array('Please Select One');

states['Ukraine'] = new Array('Please Select One');

states['United Arab Emirates'] = new Array('Please Select One');

states['United Kingdom'] = new Array('Please Select One', 'Aberdeenshire', 'Aldemey', 'Angus', 'Argyll & Bute', 'Ayrshire', 'Banffshire', 'Bedfordshire', 'Berkshire', 'Berwickshire', 'Brecknockshire', 'Buckinghamshire', 'Caemarfonshire', 'Caithness', 'Cambridgeshire', 'Carmarthenshire', 'Ceredigion', 'Cheshire', 'Clackmannanshire', 'Cornwall', 'Country Antrim', 'Country Armagh', 'Country Down', 'Country Fermanagh', 'Country Londonderry', 'Country Tyrone', 'Cromartyshire', 'Cumberland', 'Denbighshire', 'Derbyshire', 'Devon', 'Dorset', 'Dumfries & Galloway', 'Dunbartonshire', 'Durham', 'East Lothian', 'Essex', 'Fife', 'Flintshire', 'Glamorgan', 'Gloucestershire', 'Guemsey', 'Hampshire', 'Hebrides', 'Herefordshire', 'Hertfordshire', 'Huntingdonshire', 'Inverness-shire', 'Isle of Anglesey', 'Isle of Man', 'Isle of Wight', 'Isles of scilly', 'Jersey', 'Kent', 'Kincardineshire', 'Kirkcudbrightshire', 'Lanarkshire', 'Lancashire', 'Leicestershire', 'Lincolnshire', 'London', 'Merioneth', 'Middlesex', 'Midlothian', 'Monmouthshire', 'Montgomeryshire', 'Morayshire', 'Norfolk', 'Northhamptonshire', 'Northhumberland', 'Nottinghamshire', 'Orkney Islands', 'Oxfordshire', 'Peeblesshire', 'Pembrokeshire', 'Perth & Linross', 'Radnorshire', 'Renfrewshire', 'Ross-shire', 'Roxburghshire', 'Rutland', 'Selkirkshire', 'Shetland', 'Shropshire', 'Somerset', 'Staffordshire', 'Stirlingshire', 'Suffolk', 'Surrey', 'Sussex', 'Sutherland', 'Warwickshire', 'West Lothian', 'West Midlands', 'West moorland', 'Wigtownshire', 'Wiltshire', 'Worcestershire', 'Yorkshire');

states['United States'] = new Array('Please Select One', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia ', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming');

states['United States Minor Outlying Islands'] = new Array('Please Select One');

states['Uruguay'] = new Array('Please Select One');

states['Uzbekistan'] = new Array('Please Select One');

states['Vanuatu'] = new Array('Please Select One');

states['Holy See (Vatican City State)'] = new Array('Please Select One');

states['Venezuela'] = new Array('Please Select One');

states['Vietnam'] = new Array('Please Select One');

states['Virgin Islands (British)'] = new Array('Please Select One');

states['Virgin Islands (U.S.)'] = new Array('Please Select One');

states['Wallis and Futuna Islands'] = new Array('Please Select One');

states['Western Sahara'] = new Array('Please Select One');

states['Yemen'] = new Array('Please Select One');

states['Yugoslavia'] = new Array('Please Select One');

states['Zaire'] = new Array('Please Select One');

states['Zambia'] = new Array('Please Select One');

states['Zimbabwe'] = new Array('Please Select One');

function setStates() {

if (document.getElementById('country')){

	var cntrySel = document.getElementById('country');

	var stateList = states[cntrySel.value];

	if (stateList != 'Please Select One') {

		document.getElementById('state').style.display = 'block';

		document.getElementById('box_state').innerHTML = 'Please select state/province';

		document.getElementById('state1').style.display = 'none';

		document.getElementById('state1').value = "";

		document.getElementById('state').disabled = false;

		document.getElementById('state1').disabled = true;

		changeSelect('state', stateList, stateList);

	} else {

		document.getElementById('state').disabled = true;

		document.getElementById('state').style.display = 'none';

		document.getElementById('box_state').innerHTML = 'Please enter state/province';

		document.getElementById('state1').style.display = 'block';

		document.getElementById('state').options.length = 0;

	}

}

}

function changeSelect(fieldID, newOptions, newValues) {

	selectField = document.getElementById(fieldID);

	selectField.options.length = 0;

	for (i = 0; i < newOptions.length; i++) {

		selectField.options[selectField.length] = new Option(newOptions[i], newValues[i]);

	}

}

//addLoadEvent(setStates);

if(typeof HTMLAnchorElement!="undefined")

{

if (!HTMLAnchorElement.prototype.click) {

  HTMLAnchorElement.prototype.click = function() {

    var ev = document.createEvent('MouseEvents');

    ev.initEvent('click',true,true);

    if (this.dispatchEvent(ev) !== false) {

      //safari will have already done this, but I'm not sniffing safari

      //just in case they might in the future fix it; I figure it's better

      //to trigger the action twice than risk not triggering it at all

      document.location.href = this.href;

    }

  }

}

}

//end-->

function getQueryVariable(variable) {

var query = window.location.search.substring(1);

var vars = query.split("&");

	for (var i=0;i<vars.length;i++) 

		{

			var pair = vars[i].split("=");

			if (pair[0] == variable) 

			{

				return pair[1];

			}  

		} 

}





$(document).ready(function(){

	$('#submit').click(function(){

		//$('#validations').removeClass('successcolor');

		//if(check_form()){

		$.post("/contact-email.php", $("#contactform").serialize(),  function(response) {   

			$('.success').html(response);

			 //$('#success').hide('slow');

			});

		//$('.success').html('Your message was sent successfully, we will contact you as soon as possible, thank you.')

		//$('#success').addClass('successcolor');

		return false;

		//}

	});

});