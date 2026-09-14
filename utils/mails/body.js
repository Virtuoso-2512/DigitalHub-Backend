module.exports = async function(Heading, Para, PrimaryBtn, NextBtn, Image){
    return `
    <!--[if mso | IE]>
   <table align="center" border="0" cellpadding="0" cellspacing="0" st=
   yle="width:600px;" width="600"><tr><td style="line-height:0px;font-si=
   ze:0px;mso-line-height-rule:exactly;">
   <![endif]--><div style="background:#fff;background-color:#fff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0;text-align:center;vertical-align:top;"><!--[if mso | IE]>
   <table role="presentation" border="0" cellpadding="0" cellspacing="=
   0"><tr><td style="vertical-align:top;width:600px;">
   <![endif]--><div class="dys-column-per-100 outlook-group-fix" style="direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
    <tr><td align="center" class="wrapper-typography" style="font-size:0px;padding:10px 25px;padding-bottom:12px;padding-left:48px;padding-right:48px;padding-top:12px;word-break:break-word;"><div style="color:#0E1318;font-family:Open Sans, Helvetica, Arial, sans serif;font-size:28px;font-weight:700;letter-spacing:-0.5px;line-height:130%;text-align:center;"><p style="margin-top:0;margin-bottom:0;"><span style="background-color:transparent;color:rgb(0,0,0);">${Heading}</span>
   </p></div></td></tr>
    </table></div><!--[if mso | IE]>
   </td></tr></table>
   <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
   </td></tr></table>
   <![endif]-->
    <!--[if mso | IE]>
   <table align="center" border="0" cellpadding="0" cellspacing="0" st=
   yle="width:600px;" width="600"><tr><td style="line-height:0px;font-si
   ze:0px;mso-line-height-rule:exactly;">
   <![endif]--><div style="background:#fff;background-color:#fff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0vertical-align:top;"><!--[if mso | IE]>
   <table role="presentation" border="0" cellpadding="0" cellspacing="=
   0"><tr><td style="vertical-align:top;width:600px;">
   <![endif]--><div class="dys-column-per-100 outlook-group-fix" style="direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="padding-bottom:0;padding-top:0;vertical-align:top;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
    <tr><td align="center" class="wrapper-typography" style="font-size:0px;padding:10px 25px;padding-bottom:12px;padding-left:48px;padding-right:48px;padding-top:12px;word-break:break-word;"><div style="color:#0e1318;font-family:Open Sans, Helvetica, Arial, sans serif;font-size:14px;line-height:160%;"><p style="margin-top:0;margin-bottom:0;"><span style="background-color:rgb(255,255,255);color:rgb(0,0,0);">${Para}</span></p></div></td></tr>
    </table></td></tr></tbody></table></div><!--[if mso | IE]>
   </td></tr></table>
   <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
   </td></tr></table>
   <![endif]-->
    <!--[if mso | IE]>
   <table align="center" border="0" cellpadding="0" cellspacing="0" st=
   yle="width:600px;" width="600"><tr><td style="line-height:0px;font-si=
   ze:0px;mso-line-height-rule:exactly;">
   <![endif]--><div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0;padding-bottom:12px;padding-top:12px;text-align:center;vertical-align:top;"><!--[if mso | IE]>
   <table role="presentation" border="0" cellpadding="0" cellspacing="=
   0"><tr><td style="vertical-align:top;width:600px;">
   <![endif]--><div class="dys-column-per-100 outlook-group-fix" style="direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="padding:0;vertical-align:top;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
    <tr><td align="left" style="font-size:0px;padding:0;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" style="color:#000000;font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;" width="100%">
    <tr>
    <th class="wrapper-margin" width="48px">&nbsp;</th>
    ${PrimaryBtn?.name ? `<th style="text-align: left; text-align: center">
    <a href="${PrimaryBtn.link}" style="background:#1972d6;border-radius:4px;color:#ffffff;display:inline-block;font-family:Open Sans, Helvetica, Arial, sans serif;font-size:14px;font-weight:600;line-height:160%;margin:0;mso-padding-alt:0px;padding:9px 16px;text-decoration:none;text-transform:none;" target="_blank"><span style="color:#ffffff;text-decoration:none;">${PrimaryBtn.name}</span></a>
    </th>` : ""}
    <td align="right;" class="va-top" style="vertical-align: middle; text-align: right;">
      ${NextBtn?.name ? `<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; line-height: 100%; margin: 0;margin-left: auto;" width="auto">
                                           <tbody>
                                             <tr>
                                               <td align="center" role="presentation" style="background: #f2f3f5; border-radius: 4px; cursor: auto; mso-padding-alt: 0px; text-decoration: none;" valign="middle">
                                                 <a href="${NextBtn.link}" rel="noopener" style="                                                 background: #f2f3f5;                                                 border-radius: 4px;                                                 color: #2f3337;                                                 display: inline-block;                                                 font-family: 'Open Sans',Arial, sans serif;
                                                     font-size: 14px; font-weight: 600; line-height: 160%; margin: 0; mso-padding-alt: 0px; padding: 9px 16px; text-decoration: none; text-transform: none; letter-spacing: 0.005em;" target="_blank">
                                                   <!--[if mso]>
                                                     <i style="letter-spacing: 25px; mso-font-width: -100%; mso-text-raise: 30pt"></i>
                                                   <![endif]-->
                                                   <span style="mso-text-raise: 15pt;">${NextBtn.name}</span>
                                                   <!--[if mso]>
                                                     <i style="letter-spacing: 25px; mso-font-width: -100%"></i>
                                                   <![endif]-->
                                                 </a>
                                               </td>
                                             </tr>
                                           </tbody>
       </table>` : ""}
     </td>
    <th class="wrapper-margin" width="48px">&nbsp;</th>
    </tr>
    </table></td></tr>
    </table></td></tr></tbody></table></div><!--[if mso | IE]>
   </td></tr></table>
   <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
   </td></tr></table>
   <![endif]-->
    <!--[if mso | IE]>
   <table align="center" border="0" cellpadding="0" cellspacing="0" st=
   yle="width:600px;" width="600"><tr><td style="line-height:0px;font-si=
   ze:0px;mso-line-height-rule:exactly;">
   <![endif]--><div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0;padding-bottom:12px;padding-top:12px;text-align:center;vertical-align:top;"><!--[if mso | IE]>
   <table role="presentation" border="0" cellpadding="0" cellspacing="=
   0"><tr><td style="vertical-align:top;width:600px;">
   <![endif]--><div class="dys-column-per-100 outlook-group-fix" style="direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="padding:0;vertical-align:top;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
    ${Image ? `<tr><td align="left" style="font-size:0px;padding:0;padding-bottom:0;padding-top:0;word-break:break-word;"><div style='color:#0E1318;font-family:"Open Sans", Helvetica, Arial, sans-serif;font-size:16px;line-height:160%;text-align:left;'>
    <table border="0" cellpadding="0" cellspacing="0" style="color:#000000;font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;" width="100%">
    <tr>
      <th>
        <img ratio="600:450" src="${Image}" style="width: 100%; border-radius: 4px;">
      </th>
    </tr>
    </table>
    </div></td></tr>` : ""}
    </table></td></tr></tbody></table></div><!--[if mso | IE]>
   </td></tr></table>
   <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
   </td></tr></table>
   <![endif]-->
    <!--[if mso | IE]>
   <table align="center" border="0" cellpadding="0" cellspacing="0" st=
   yle="width:600px;" width="600"><tr><td style="line-height:0px;font-si=
   ze:0px;mso-line-height-rule:exactly;">
   <![endif]--><div style="background:#fff;background-color:#fff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fff;background-color:#fff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0;text-align:center;vertical-align:top;"><!--[if mso | IE]>
   <table role="presentation" border="0" cellpadding="0" cellspacing="0"></table>
   <![endif]-->
    <!--[if mso | IE]>
   <table align="center" border="0" cellpadding="0" cellspacing="0" st=
   yle="width:600px;" width="600"><tr><td style="line-height:0px;font-si=
   ze:0px;mso-line-height-rule:exactly;">
   <![endif]--><div style="background:#edf0f2;background-color:#edf0f2;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#edf0f2;background-color:#edf0f2;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0;text-align:center;vertical-align:top;"><!--[if m=
   so | IE]>
   <table role="presentation" border="0" cellpadding="0" cellspacing="=
   0"><tr><td style="vertical-align:top;width:600px;">
   <![endif]--><div class="dys-column-per-100 outlook-group-fix" style="direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="padding:0;vertical-align:top;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
    <tr><td align="left" style="font-size:0px;padding:0;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" style="color:#000000;font-family:Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;" width="100%">
    <tr>
    <td>
    <table class="border-radius-for-large" style="border-radius: 0 0 8px 8px; background: #fff; width: 100%">
    <tr>
    <td height="18" style="padding:0;">&nbsp;</td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
      <td class="spacing-for-large" height="24"></td>
    </tr>
   </table>
   <![endif]-->`
}