const file_html_data = "<c-wiz class=\"pmHCK\" onclick=\"onItemClick('{0}','file','{1}')\">\n" +
                       "    <div class=\"WYuW0e dPmH0b\">\n" +
                       "        <div role=\"row\">\n" +
                       "            <div role=\"gridcell\" class=\"file jGNTYb ACGwFc\">\n" +
                       "                <div class=\"gudAKb\">\n" +
                       "                    <div class=\"V1mwke\">\n" +
                       "                        <div class=\"l-u-Ab-zb-x l-ta-wa\">\n" +
                       "                            <div class=\"l-u-Ab-zb l-u-Ab-ul\">\n" +
                       "                                <div class=\"l-u-Ab-zb-Pn-ve\"></div>\n" +
                       "                                <div class=\"l-u-Ab-zb-Lu\"></div>\n" +
                       "                                <img class=\"l-u-Ab-zb-c\" src=\"/getAssets?res=mime-type-icon/{1}\"></div>\n" +
                       "                        </div>\n" +
                       "                    </div>\n" +
                       "                </div>\n" +
                       "                <div class=\"bSmy5\">\n" +
                       "                    <div class=\"a-Oa-qd-Nd\">\n" +
                       "                        <svg height=\"100%\" width=\"100%\" viewBox=\"0 0 10 10\" preserveAspectRatio=\"none\"\n" +
                       "                             focusable=\"false\">\n" +
                       "                            <rect width=\"10\" height=\"10\"></rect>\n" +
                       "                        </svg>\n" +
                       "                    </div>\n" +
                       "                    <div class=\"tohzcb\">\n" +
                       "                        <div class=\"a-c\">\n" +
                       "                            <img class=\"a-Ua-c\" src=\"/getAssets?res=mime-type-icon/{1}\"></div>\n" +
                       "                    </div>\n" +
                       "                    <div class=\"TBiAlb\"></div>\n" +
                       "                    <div class=\"Q5txwe\">{0}\n" +
                       "                    </div>\n" +
                       "                </div>\n" +
                       "            </div>\n" +
                       "        </div>\n" +
                       "    </div>\n" +
                       "</c-wiz>";
const directory_html_data = "<c-wiz class=\"pmHCK\" onclick=\"onItemClick('{0}','Directory','')\">\n" +
                            "    <div class=\"WYuW0e RDfNAe dPmH0b \">\n" +
                            "        <div  role=\"row\" >\n" +
                            "            <div role=\"gridcell\" class=\"directory jGNTYb\">\n" +
                            "                <div class=\"bSmy5\">\n" +
                            "                    <div class=\"a-Oa-qd-Nd\">\n" +
                            "                        <svg height=\"100%\" width=\"100%\" viewBox=\"0 0 10 10\" preserveAspectRatio=\"none\"\n" +
                            "                             focusable=\"false\">\n" +
                            "                            <rect width=\"10\" height=\"10\"></rect>\n" +
                            "                        </svg>\n" +
                            "                    </div>\n" +
                            "                    <div class=\"tohzcb\">\n" +
                            "                        <div class=\"l-o-c-qd\" >\n" +
                            "                            <svg x=\"0px\" y=\"0px\" focusable=\"false\" viewBox=\"0 0 24 24\" height=\"24px\" width=\"24px\"\n" +
                            "                                 fill=\"#4986e7\">\n" +
                            "                                <g>\n" +
                            "                                    <path d=\"M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z\"></path>\n" +
                            "                                    <path d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n" +
                            "                                </g>\n" +
                            "                            </svg>\n" +
                            "                        </div>\n" +
                            "                    </div>\n" +
                            "                    <div class=\"TBiAlb\"></div>\n" +
                            "                    <div class=\"Q5txwe\">{0}</div>\n" +
                            "                </div>\n" +
                            "            </div>\n" +
                            "        </div>\n" +
                            "    </div>\n" +
                            "</c-wiz>";
const file_detail_icon_html = "<div class=\"V1mwke\">\n" +
                              "    <div class=\"l-u-Ab-zb-x l-ta-wa\">\n" +
                              "        <div class=\"l-u-Ab-zb l-u-Ab-ul\">\n" +
                              "            <div class=\"l-u-Ab-zb-Pn-ve\"></div>\n" +
                              "            <div class=\"l-u-Ab-zb-Lu\"></div>\n" +
                              "            <img class=\"l-u-Ab-zb-c\" src=\"{0}\"></div>\n" +
                              "    </div>\n" +
                              "</div>";
const file_detail_icon_video_html = "<div class=\"V1mwke\">\n" +
                              "    <div class=\"l-u-Ab-zb-x l-ta-wa\">\n" +
                              "        <div class=\"l-u-Ab-zb l-u-Ab-ul\">\n" +
                              "            <img class=\"l-u-Ab-zb-c\" src=\"{0}\" style=\"width: inherit;height: inherit;\"></div>\n" +
                              "    </div>\n" +
                              "</div>";
const file_detail_html = "<li class=\"mdc-list-item\">\n" +
                         "    <span style=\"width: 150px;min-width: 150px;\" class=\"mdc-list-item__text\">{0}</span>\n" +
                         "    <span style=\"max-width: 400px\" class=\"mdc-list-item__text\">{1}</span>\n" +
                         "</li>";
const dialog_actions_html = "<button type=\"button\" {1} data-mdc-dialog-action=\"0\" class=\"mdc-button mdc-dialog__button\" onclick=\"onDialogButtonClick('{0}','play')\">\n" +
                            "    <div class=\"mdc-button__ripple\"></div>\n" +
                            "    <span class=\"mdc-button__label\">使用PotPlayer播放</span>\n" +
                            "</button>\n" +
                            "<button type=\"button\" data-mdc-dialog-action=\"1\" class=\"mdc-button mdc-dialog__button dialog-copy\" onclick=\"onDialogButtonClick('{0}','copy')\">\n" +
                            "    <div class=\"mdc-button__ripple\"></div>\n" +
                            "    <span class=\"mdc-button__label\">复制链接</span>\n" +
                            "</button>\n" +
                            "<button type=\"button\" data-mdc-dialog-action=\"2\" class=\"mdc-button mdc-dialog__button\" onclick=\"onDialogButtonClick('{0}','download')\">\n" +
                            "    <div class=\"mdc-button__ripple\"></div>\n" +
                            "    <span class=\"mdc-button__label\">下载文件</span>\n" +
                            "</button>";
const menu_list_html = "<li class=\"mdc-list-item\" role=\"menuitem\" onclick=\"getSettings('SHOW_HIDDEN_FILES','{1}')\">\n" +
                       "    <span class=\"mdc-list-item__ripple\"></span>\n" +
                       "    <span class=\"mdc-list-item__text\">{0}</span>\n" +
                       "</li>\n";;