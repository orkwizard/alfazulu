import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = props => {
  const ref = useRef();
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/dashboard" className="">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboards")}</span>
              </Link>              
            </li>

            <li className="menu-title">{props.t("Apps")}</li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className='bx bxs-user-badge'></i>
                <span>{props.t("Partner")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/partner-list">{props.t("Partner List")}</Link>
                </li>
                {/* <li>
                  <Link to="/create-partner">{props.t("Create partner")}</Link>
                </li> */}
              </ul>
            </li>

            {/* <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bxs-user-detail"></i>
                <span>{props.t("Contacts")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/contacts-grid">{props.t("User Grid")}</Link>
                </li>
                <li>
                  <Link to="/contacts-list">{props.t("User List")}</Link>
                </li>
                <li>
                  <Link to="/contacts-profile">{props.t("Profile")}</Link>
                </li>
              </ul>
            </li> */}

            {/* <li className="menu-title">Actions</li>
            <li>
              <Link to="/#" className="">
                <i className="bx bx-user-circle"></i>
                <span className="badge rounded-pill bg-success float-end">
                  {props.t("New")}
                </span>
                <span>{props.t("Authentication")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/pages-login">{props.t("Login")}</Link>
                </li>
                <li>
                  <Link to="/pages-login-2">{props.t("Login 2")}</Link>
                </li>
                <li>
                  <Link to="/pages-register">{props.t("Register")}</Link>
                </li>
                <li>
                  <Link to="/pages-register-2">{props.t("Register 2")}</Link>
                </li>
                <li>
                  <Link to="/page-recoverpw">
                    {props.t("Recover Password")}
                  </Link>
                </li>
                <li>
                  <Link to="/page-recoverpw-2">
                    {props.t("Recover Password 2")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-lock-screen">{props.t("Lock Screen")}</Link>
                </li>
                <li>
                  <Link to="/auth-lock-screen-2">
                    {props.t("Lock Screen 2")}
                  </Link>
                </li>
                <li>
                  <Link to="/page-confirm-mail">{props.t("Confirm Mail")}</Link>
                </li>
                <li>
                  <Link to="/page-confirm-mail-2">
                    {props.t("Confirm Mail 2")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-email-verification">
                    {props.t("Email Verification")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-email-verification-2">
                    {props.t("Email Verification 2")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-two-step-verification">
                    {props.t("Two Step Verification")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-two-step-verification-2">
                    {props.t("Two Step Verification 2")}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-file"></i>
                <span>{props.t("Utility")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/pages-starter">{props.t("Starter Page")}</Link>
                </li>
                <li>
                  <Link to="/pages-maintenance">{props.t("Maintenance")}</Link>
                </li>
                <li>
                  <Link to="/pages-comingsoon">{props.t("Coming Soon")}</Link>
                </li>
                <li>
                  <Link to="/pages-timeline">{props.t("Timeline")}</Link>
                </li>
                <li>
                  <Link to="/pages-faqs">{props.t("FAQs")}</Link>
                </li>
                <li>
                  <Link to="/pages-pricing">{props.t("Pricing")}</Link>
                </li>
                <li>
                  <Link to="/pages-404">{props.t("Error 404")}</Link>
                </li>
                <li>
                  <Link to="/pages-500">{props.t("Error 500")}</Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">{props.t("Components")}</li>

            <li>
                <Link to="/#" className="has-arrow">
                  <i className="bx bx-tone" />
                  <span>{props.t("UI Elements")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/ui-alerts">{props.t("Alerts")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-buttons">{props.t("Buttons")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-cards">{props.t("Cards")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-carousel">{props.t("Carousel")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-dropdowns">{props.t("Dropdowns")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-offcanvas">{props.t("OffCanvas")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-grid">{props.t("Grid")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-images">{props.t("Images")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-lightbox">{props.t("Lightbox")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-modals">{props.t("Modals")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-rangeslider">
                      {props.t("Range Slider")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/ui-session-timeout">
                      {props.t("Session Timeout")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/ui-progressbars">
                      {props.t("Progress Bars")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/ui-placeholders">{props.t("Placeholders")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-sweet-alert">
                      {props.t("Sweet-Alert")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/ui-tabs-accordions">
                      {props.t("Tabs & Accordions")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/ui-typography">
                      {props.t("Typography")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/ui-toasts">{props.t("Toasts")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-video">{props.t("Video")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-general">{props.t("General")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-colors">{props.t("Colors")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-rating">{props.t("Rating")}</Link>
                  </li>
                  <li>
                    <Link to="/ui-notifications">
                      {props.t("Notifications")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/ui-breadcrumb">
                      {props.t("Breadcrumb")}
                    </Link>
                  </li>
                </ul>
              </li>

            <li>
              <Link to="/#" className="">
                <i className="bx bxs-eraser"></i>
                <span className="badge rounded-pill bg-danger float-end">
                  10
                </span>
                <span>{props.t("Forms")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/form-elements">{props.t("Form Elements")}</Link>
                </li>
                <li>
                  <Link to="/form-layouts">{props.t("Form Layouts")}</Link>
                </li>
                <li>
                  <Link to="/form-validation">
                    {props.t("Form Validation")}
                  </Link>
                </li>
                <li>
                  <Link to="/form-advanced">{props.t("Form Advanced")}</Link>
                </li>
                <li>
                  <Link to="/form-editors">{props.t("Form Editors")}</Link>
                </li>
                <li>
                  <Link to="/form-uploads">{props.t("Form File Upload")} </Link>
                </li>
                <li>
                  <Link to="/form-xeditable">{props.t("Form Xeditable")}</Link>
                </li>
                <li>
                  <Link to="/form-repeater">{props.t("Form Repeater")}</Link>
                </li>
                <li>
                  <Link to="/form-wizard">{props.t("Form Wizard")}</Link>
                </li>
                <li>
                  <Link to="/form-mask">{props.t("Form Mask")}</Link>
                </li>
                <li>
                  <Link to="/dual-listbox">{props.t("Transfer List")}</Link>
                </li>
              </ul>
            </li>

             */}
          </ul>
        </div>
      </SimpleBar>
    </>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
