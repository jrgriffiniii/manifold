import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class Upload extends Component {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stroke: PropTypes.string,
    fill: PropTypes.string,
    svgProps: PropTypes.object
  };

  static defaultProps = {
    className: "",
    size: "inherit",
    stroke: "currentColor",
    fill: "currentColor",
    svgProps: {}
  };

  get defaultHeight() {
    return 32;
  }

  get defaultWidth() {
    return 32;
  }

  get size() {
    return this.props.size;
  }

  get width() {
    if (this.size === null || this.size === "inherit") return null;
    if (this.size === "default") return this.defaultWidth;
    return this.size;
  }

  get height() {
    if (this.size === null || this.size === "inherit") return null;
    if (this.size === "default") return this.defaultHeight;
    return this.size;
  }

  get viewBox() {
    return "0 0 32 32";
  }

  get classes() {
    const { className } = this.props;
    return classnames("manicon-svg", className);
  }

  get fill() {
    return this.props.fill;
  }

  get stroke() {
    return this.props.stroke;
  }

  render() {
    const baseSvgProps = {
      xmlns: "http://www.w3.org/2000/svg",
      className: this.classes,
      width: this.width,
      height: this.height,
      viewBox: this.viewBox,
      fill: this.fill
    };

    const svgProps = Object.assign(baseSvgProps, this.props.svgProps);

    return (
      <svg {...svgProps}>
        <path d="M16.5,18.2024383 L16.5,27.0033 L15.5,27.0033 L15.5,18.2024383 L11.6940607,22.0410396 L10.9839392,21.3369604 L16,16.2778526 L21.0160608,21.3369604 L20.3059393,22.0410396 L16.5,18.2024383 Z M24.2097351,9.00182602 C26.6171296,9.30530197 28.5412989,11.1503646 28.9421422,13.5249548 C29.2474645,15.0015548 28.8681316,16.5370086 27.9103169,17.7015515 C26.9525021,18.8660943 25.5191135,19.534607 24.0113485,19.5199765 L24.0210515,18.5200235 C25.2263986,18.5317196 26.3722872,17.9972929 27.1379896,17.0663267 C27.903692,16.1353604 28.2069406,14.9078781 27.9594867,13.7094935 C27.6287577,11.7519117 26.0543992,10.2422785 24.0782184,9.99311866 C23.2373124,9.87598444 22.3803889,9.98198238 21.5933693,10.3004844 C21.3310615,10.4066387 21.0330084,10.2741504 20.9360602,10.0083024 C20.188538,7.95847192 18.2267246,6.60532325 16.0263632,6.63465746 C13.2558098,6.56849529 10.9553127,8.75906119 10.886,11.517 C10.886,11.6397736 10.8933463,11.7681375 10.9086704,11.9376949 C10.9491024,12.3850645 10.4249355,12.6546908 10.0845019,12.3616391 C9.43375821,11.8014664 8.61698182,11.4706305 7.75826225,11.4199357 C6.40517864,11.3357802 5.12348774,12.0341387 4.46062061,13.216731 C3.79775347,14.3993233 3.87089154,15.8570911 4.62382585,16.9347068 C5.45672454,17.9368278 6.69525448,18.512445 7.99828086,18.5030131 L8.00551909,19.5029869 C6.40273279,19.5145886 4.87928028,18.8065512 3.82980358,17.5412019 C2.83147919,16.1162891 2.73761743,14.2454623 3.58830819,12.7277821 C4.43899895,11.2101018 6.08385739,10.3138632 7.81876488,10.4217689 C8.55907759,10.4654714 9.27539985,10.6757068 9.91635141,11.0316636 C10.2352211,7.93669947 12.8864044,5.55940535 16.0315555,5.63484546 C18.4717766,5.60192647 20.6817868,7.01663372 21.6868971,9.20668144 C22.5027815,8.95479416 23.3652997,8.88416442 24.2097351,9.00182602 Z" />
      </svg>
    );
  }
}
