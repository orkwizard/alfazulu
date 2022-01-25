import PropTypes from "prop-types";
import { useEffect } from "react";

import { withRouter } from "react-router-dom";
  import {
    changeLayout,
    changeLayoutWidth,
    changeSidebarTheme,
    changeSidebarType,
  } from "../../store/actions";

// Layout Related Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

//redux
import { useSelector, useDispatch } from "react-redux";

const Layout = props => {
  const dispatch = useDispatch();

  const {
    leftSideBarType,
    leftSideBarTheme,
    layoutWidth,
  } = useSelector(state => ({
    leftSideBarType: state.Layout.leftSideBarType,
    leftSideBarTheme: state.Layout.leftSideBarTheme,
    layoutWidth: state.Layout.layoutWidth,
  }));

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const toggleMenuCallback = () => {
    if (leftSideBarType === "default") {
      dispatch(changeSidebarType("condensed", isMobile));
    } else if (leftSideBarType === "condensed") {
      dispatch(changeSidebarType("default", isMobile));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(changeLayout("vertical"));
  }, [dispatch]);

  useEffect(() => {
    if (leftSideBarTheme) {
      dispatch(changeSidebarTheme(leftSideBarTheme));
    }
  }, [leftSideBarTheme, dispatch]);

  useEffect(() => {
    if (leftSideBarType) {
      dispatch(changeSidebarType(leftSideBarType));
    }
  }, [leftSideBarType, dispatch]);

  useEffect(() => {
    if (layoutWidth) {
      dispatch(changeLayoutWidth(layoutWidth));
    }
  }, [layoutWidth, dispatch]);


  return (
    <>      

      <div id="layout-wrapper">
        <Header toggleMenuCallback={toggleMenuCallback} />
        <Sidebar
          theme={leftSideBarTheme}
          type={leftSideBarType}
          isMobile={isMobile}
        />
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>
    </>
  );
};

Layout.propTypes = {
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarThemeImage: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.object,
};

export default withRouter(Layout);
