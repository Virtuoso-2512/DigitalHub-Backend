const 
NAME = "Arnav Thakare", 
LINK = "https://thakare-arnav.onrender.com", 
LOGO = "",
APP_STORE = "https://res.cloudinary.com/demo/image/upload/v1682262875/docs_uploading_example/unnamed_1_vvyc7n.png",
APP_STORE_APP = "",
GPLAY_STORE = "https://res.cloudinary.com/demo/image/upload/v1682262882/docs_uploading_example/unnamed_xgiptz.png",
GPLAY_STORE_APP = "";

module.exports = function(intVal, mailId){
    return `<!-- FOOTER : BEGIN -->
    
<!--[if mso | IE]>
<table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
<![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0;text-align:center;vertical-align:top;"><!--[if mso | IE]>
<table role="presentation" border="0" cellpadding="0" cellspacing="=
0"><tr><td style="vertical-align:top;width:600px;">
<![endif]--><div class="dys-column-per-100 outlook-group-fix" style="direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="padding:0;vertical-align:top;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
 <tr><td align="left" style="font-size:0px;padding:0;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" style="color:#000000;font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;" width="100%">
 <tr>
 <td colspan="3">
 <div class="footer-bg-mobile" style="background-color: #edf0f2">
 <table border="0" cellpadding="0" cellspacing="0" style="color:#000000;font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;" width="100%">
 <tr>
 <td height="24">&nbsp;</td>
 </tr>
 <tr valign="middle">
  <td width="15%">&nbsp;</td>
  <td valign="middle" style="color:#515559;font-family:Open Sans, Helvetica, Arial, sans serif;font-size:14px;font-weight:400;line-height:160%;text-align:center;">${intVal}</td>
  <td width="15%">&nbsp;</td>
  </tr> 
 <tr>
 <td colspan="3" height="24" style="border-bottom: 1px solid #DDE1E3">&nbsp;</td>
 </tr>
 <tr>
 <td height="24">&nbsp;</td>
 </tr>
 <tr>
 <td colspan="3">
 <table align="center" cellpadding="0" cellspacing="0" width="auto">
 <tr>
 <th>
 <table align="center" cellpadding="0" cellspacing="0" width="100%">
 <tr>
 <th style="padding-bottom: 8px;">
 <div style="color:#515559;font-family:Open Sans, Helvetica, Arial, sans serif;font-size:14px;font-weight:400;line-height:160%;text-align:center;">Get Our App</div>
 </th>
 </tr>
 </table>
 <table align="center" cellpadding="0" cellspacing="0" width="auto">
 <tr>
 <th>
 <a href="${APP_STORE_APP}" style="color: #2c3135; font-family: Open Sans, Helvetica, Arial, sans serif; font-size: 14px; font-weight: 400; line-height: 160%;text-decoration:underline;"><span style="color:#2c3135;"><img alt="app store" height="38" src="${APP_STORE}" style="display: block; width: 129px; height: 38px;" width="129"></span></a>
 </th>
 <th width="12px"></th>
 <th>
 <a href="${GPLAY_STORE_APP}" style="color: #2c3135; font-family: Open Sans, Helvetica, Arial, sans serif; font-size: 14px; font-weight: 400; line-height: 160%;text-decoration:underline;"><span style="color:#2c3135;"><img alt="google play" height="38" src="${GPLAY_STORE}" style="display: block; width: 127px; height: 38px;" width="127"></span></a>
 </th>
 </tr>
 </table>
 </th>
 </tr>
 </table>
 </td>
 </tr>
 <tr>
 <td colspan="3" height="24" style="border-bottom: 1px solid #DDE1E3">&nbsp;</td>
 </tr>
 <tr>
 <td height="24">&nbsp;</td>
 </tr>
 <tr>
 <td width="24">&nbsp;</td>
 <td>
    <table border="0" cellpadding="0" cellspacing="0" style="color:#000000;font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;" width="100%">
      <tr valign="middle">
        <td width="25%">&nbsp;</td>
        <td align="center" style="vertical-align: middle; width: 80px" width="80">
          <span style="color: #0e1318; text-decoration: none"> <img alt="${NAME}" height="auto" src="${LOGO}" style="border: none; display: block; font-size: 13px; outline: none; text-decoration: none; width: 100%; height: auto" width="80"> </span>
        </td>
        <td width="25%">&nbsp;</td>
      </tr>
      <tr>
        <td height="24">&nbsp;</td>
      </tr>
      <tr valign="middle">
        <td width="5%">&nbsp;</td>
        <td valign="middle" style="color:#515559;font-family:Open Sans, Helvetica, Arial, sans serif;font-size:16px;font-weight:400;line-height:160%;text-align:center;">&copy; ${NAME} 2023. All Rights Reserved.</td>
        <td width="5%">&nbsp;</td>
      </tr>  
      <tr>
      <td height="24">&nbsp;</td>
      </tr>  
    </table>
 </td>
 <td width="24">&nbsp;</td>
 </tr>
 <tr>
 <td colspan="3" style="padding-top: 4px;">
 <table align="center" cellpadding="0" cellspacing="0" width="auto">
 <tr>
 <td>
 <div style="color:#515559;font-family:Open Sans, Helvetica, Arial, sans serif;font-size:14px;line-height:160%;text-align:center;">
 <a href="${LINK}" style="color: #515559; font-family: Open Sans, Helvetica, Arial, sans serif; font-size: 14px; font-weight: 400; line-height: 160%;text-decoration:underline;"><span style="color:#515559;">Visit Us</span></a>
 </div>
 </td>
 </tr>
 </table>
 </td>
 </tr>
 <tr>
 <td height="16"></td>
 </tr>
 <tr>
 <td height="48px"></td>
 </tr>
 </table>
 </div>
 </td>
 </tr>
 </table></td></tr>
 </table></td></tr></tbody></table></div><!--[if mso | IE]>
</td></tr></table>
<![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</div><img src="https://l.engage.canva.com/ss/o/WidYBisxQHTw4AV5utnA-Q/3vh/vVGg1sE-QvWi3HMB_LWjfg/ho.gif" alt="" width="1" height="1" border="0" style="height:1px !important;width:1px !important;border-width:0 !important;margin-top:0 !important;margin-bottom:0 !important;margin-right:0 !important;margin-left:0 !important;padding-top:0 !important;padding-bottom:0 !important;padding-right:0 !important;padding-left:0 !important;"/>
</body> 
</html>`
}