"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export const TrustWalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <g fill="none">
      <path
        fill="#0500FF"
        d="M3.9 5.6L12 3v18c-5.786-2.4-8.1-7-8.1-9.6z"
      ></path>
      <path
        fill="url(#tokenBrandedTrust0)"
        d="M20.1 5.6L12 3v18c5.786-2.4 8.1-7 8.1-9.6z"
      ></path>
      <defs>
        <linearGradient
          id="tokenBrandedTrust0"
          x1="17.948"
          x2="11.967"
          y1="1.74"
          y2="20.797"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".02" stopColor="#00F"></stop>
          <stop offset=".08" stopColor="#0094FF"></stop>
          <stop offset=".16" stopColor="#48FF91"></stop>
          <stop offset=".42" stopColor="#0094FF"></stop>
          <stop offset=".68" stopColor="#0038FF"></stop>
          <stop offset=".9" stopColor="#0500FF"></stop>
        </linearGradient>
      </defs>
    </g>
  </svg>
);

const MetamaskIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2.3em"
    height="2.3em"
    viewBox="0 0 256 240"
  >
    <path fill="#E17726" d="M250.066 0L140.219 81.279l20.427-47.9z"></path>
    <path
      fill="#E27625"
      d="m6.191.096l89.181 33.289l19.396 48.528zM205.86 172.858l48.551.924l-16.968 57.642l-59.243-16.311zm-155.721 0l27.557 42.255l-59.143 16.312l-16.865-57.643z"
    ></path>
    <path
      fill="#E27625"
      d="m112.131 69.552l1.984 64.083l-59.371-2.701l16.888-25.478l.214-.245zm31.123-.715l40.9 36.376l.212.244l16.888 25.478l-59.358 2.7zM79.435 173.044l32.418 25.259l-37.658 18.181zm97.136-.004l5.131 43.445l-37.553-18.184z"
    ></path>
    <path
      fill="#D5BFB2"
      d="m144.978 195.922l38.107 18.452l-35.447 16.846l.368-11.134zm-33.967.008l-2.909 23.974l.239 11.303l-35.53-16.833z"
    ></path>
    <path
      fill="#233447"
      d="m100.007 141.999l9.958 20.928l-33.903-9.932zm55.985.002l24.058 10.994l-34.014 9.929z"
    ></path>
    <path
      fill="#CC6228"
      d="m82.026 172.83l-5.48 45.04l-29.373-44.055zm91.95.001l34.854.984l-29.483 44.057zm28.136-44.444l-25.365 25.851l-19.557-8.937l-9.363 19.684l-6.138-33.849zm-148.237 0l60.435 2.749l-6.139 33.849l-9.365-19.681l-19.453 8.935z"
    ></path>
    <path
      fill="#E27525"
      d="m52.166 123.082l28.698 29.121l.994 28.749zm151.697-.052l-29.746 57.973l1.12-28.8zm-90.956 1.826l1.155 7.27l2.854 18.111l-1.835 55.625l-8.675-44.685l-.003-.462zm30.171-.101l6.521 35.96l-.003.462l-8.697 44.797l-.344-11.205l-1.357-44.862z"
    ></path>
    <path
      fill="#F5841F"
      d="m177.788 151.046l-.971 24.978l-30.274 23.587l-6.12-4.324l6.86-35.335zm-99.471 0l30.399 8.906l6.86 35.335l-6.12 4.324l-30.275-23.589z"
    ></path>
    <path
      fill="#C0AC9D"
      d="m67.018 208.858l38.732 18.352l-.164-7.837l3.241-2.845h38.334l3.358 2.835l-.248 7.831l38.487-18.29l-18.728 15.476l-22.645 15.553h-38.869l-22.63-15.617z"
    ></path>
    <path
      fill="#161616"
      d="m142.204 193.479l5.476 3.869l3.209 25.604l-4.644-3.921h-36.476l-4.556 4l3.104-25.681l5.478-3.871z"
    ></path>
    <path
      fill="#763E1A"
      d="M242.814 2.25L256 41.807l-8.235 39.997l5.864 4.523l-7.935 6.054l5.964 4.606l-7.897 7.191l4.848 3.511l-12.866 15.026l-52.77-15.365l-.457-.245l-38.027-32.078zm-229.628 0l98.326 72.777l-38.028 32.078l-.457.245l-52.77 15.365l-12.866-15.026l4.844-3.508l-7.892-7.194l5.952-4.601l-8.054-6.071l6.085-4.526L0 41.809z"
    ></path>
    <path
      fill="#F5841F"
      d="m180.392 103.99l55.913 16.279l18.165 55.986h-47.924l-33.02.416l24.014-46.808zm-104.784 0l-17.151 25.873l24.017 46.808l-33.005-.416H1.631l18.063-55.985zm87.776-70.878l-15.639 42.239l-3.319 57.06l-1.27 17.885l-.101 45.688h-30.111l-.098-45.602l-1.274-17.986l-3.32-57.045l-15.637-42.239z"
    ></path>
  </svg>
);

export const CoinbaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <g fill="none">
      <path fill="#0E5BFF" d="M3 12a9 9 0 1 1 18 0a9 9 0 0 1-18 0"></path>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M12 18.375a6.375 6.375 0 1 0 0-12.75a6.375 6.375 0 0 0 0 12.75m-.75-8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125z"
        clipRule="evenodd"
      ></path>
    </g>
  </svg>
);

export const UniswapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <g fill="#F50DB4">
      <path d="M17.206 5.72c.024-.425.082-.705.198-.962c.046-.101.09-.184.096-.184a.6.6 0 0 1-.044.166c-.085.249-.099.59-.04.985c.073.502.115.575.648 1.117c.25.255.54.575.646.713l.191.25l-.191-.178c-.234-.22-.773-.646-.892-.707c-.08-.041-.092-.04-.141.008c-.045.045-.055.113-.061.432c-.01.498-.078.818-.242 1.138c-.09.172-.104.136-.023-.06c.06-.145.066-.21.066-.691c-.001-.969-.117-1.202-.793-1.6a7 7 0 0 0-.628-.325a2.4 2.4 0 0 1-.307-.149c.02-.019.68.173.945.275c.395.151.46.171.508.153c.032-.013.048-.106.064-.38"></path>
      <path d="M8.857 4.312c-.235-.037-.245-.04-.134-.058c.211-.032.71.012 1.054.093c.803.19 1.534.677 2.314 1.54l.207.23l.297-.048c1.249-.2 2.519-.04 3.582.448c.292.134.753.401.81.47c.019.022.053.163.075.313c.08.52.04.92-.12 1.217c-.087.163-.092.214-.034.353c.047.11.177.192.306.192c.264 0 .549-.425.68-1.015l.053-.235l.103.117c.569.64 1.015 1.514 1.092 2.136l.02.162l-.096-.148a1.8 1.8 0 0 0-.54-.565c-.382-.251-.786-.337-1.854-.393c-.964-.05-1.51-.132-2.051-.308c-.921-.298-1.386-.696-2.48-2.124c-.486-.634-.786-.985-1.085-1.267c-.678-.642-1.346-.979-2.2-1.11m.456 3.07c-.476-.651-.77-1.65-.707-2.397l.02-.232l.108.02c.204.037.555.167.719.266c.45.272.646.63.844 1.551c.058.27.135.575.17.678c.056.166.27.555.443.807c.125.181.042.268-.234.243c-.422-.038-.994-.43-1.363-.936m7.316 4.85c-2.224-.89-3.008-1.664-3.008-2.968c0-.192.007-.35.015-.35s.094.064.191.142c.451.36.956.513 2.354.716c.823.12 1.286.216 1.713.357c1.358.447 2.197 1.356 2.398 2.594c.058.36.024 1.034-.07 1.389c-.075.28-.302.787-.363.806c-.016.006-.033-.058-.037-.145c-.023-.465-.259-.917-.655-1.256c-.451-.385-1.057-.692-2.538-1.285m-1.561.37a4 4 0 0 0-.108-.468l-.057-.168l.106.117c.146.163.26.371.359.649c.074.212.082.275.082.619c0 .338-.01.409-.079.6c-.108.3-.243.513-.47.742c-.405.411-.928.639-1.681.733c-.131.017-.513.044-.849.062c-.846.043-1.403.134-1.903.309a.4.4 0 0 1-.143.034c-.02-.02.32-.222.602-.357c.397-.19.792-.294 1.676-.44c.438-.073.889-.16 1.004-.196c1.082-.33 1.639-1.182 1.46-2.236"></path>
      <path d="M16.086 14.403c-.295-.632-.363-1.242-.201-1.811c.017-.06.045-.11.061-.11a.6.6 0 0 1 .155.083c.137.091.41.245 1.137.639c.908.492 1.426.874 1.778 1.31c.308.38.499.815.59 1.345c.053.3.022 1.022-.055 1.324c-.244.953-.812 1.701-1.62 2.138a2 2 0 0 1-.237.116c-.012 0 .031-.109.096-.242c.272-.566.303-1.117.097-1.73c-.126-.375-.383-.832-.902-1.606c-.603-.9-.75-1.14-.899-1.456m-8.353 3.408c.825-.693 1.852-1.185 2.787-1.336c.403-.065 1.075-.04 1.448.055c.598.153 1.134.494 1.412.9c.272.398.389.744.51 1.514c.048.304.1.609.116.678c.091.399.269.718.49.878c.349.255.95.27 1.542.04a.8.8 0 0 1 .194-.06c.022.022-.276.22-.487.325c-.283.14-.508.195-.807.195c-.542 0-.992-.274-1.368-.834c-.074-.11-.24-.44-.37-.733c-.396-.9-.591-1.173-1.052-1.473c-.4-.261-.918-.308-1.306-.119c-.511.25-.654.899-.288 1.31c.145.164.416.305.638.332a.68.68 0 0 0 .771-.679c0-.27-.104-.425-.367-.543c-.36-.161-.746.027-.744.363c0 .143.064.233.208.298c.092.042.095.045.02.03c-.33-.068-.408-.464-.143-.726c.319-.315.977-.176 1.203.254c.095.18.106.54.023.757c-.185.487-.726.742-1.274.603c-.373-.095-.524-.197-.974-.658c-.782-.8-1.085-.956-2.212-1.13l-.216-.034z"></path>
      <path
        fillRule="evenodd"
        d="M4.065 3.479c2.61 3.15 4.408 4.45 4.608 4.726c.165.226.103.43-.18.59c-.157.089-.48.179-.642.179c-.183 0-.246-.07-.246-.07c-.106-.1-.165-.083-.71-1.045a166 166 0 0 0-1.407-2.151c-.04-.038-.039-.037 1.33 2.399c.22.508.044.694.044.766c0 .147-.04.225-.223.427c-.304.338-.44.717-.538 1.501c-.11.88-.42 1.501-1.277 2.565c-.502.622-.584.736-.71.987c-.16.316-.204.493-.222.892c-.019.422.018.695.148 1.098c.113.353.231.586.534 1.052c.261.403.412.702.412.819c0 .093.018.093.423.002c.968-.217 1.755-.6 2.197-1.069c.274-.29.338-.45.34-.848c.002-.26-.007-.315-.078-.465c-.115-.243-.325-.446-.787-.76c-.605-.411-.863-.743-.935-1.198c-.058-.374.01-.638.345-1.336c.346-.722.432-1.03.49-1.758c.038-.47.09-.656.225-.805c.142-.155.27-.208.62-.255c.572-.078.936-.225 1.236-.5c.26-.237.368-.467.385-.812l.012-.261l-.145-.169C8.79 7.371 3.714 3 3.681 3c-.007 0 .166.216.384.479m1.216 12.244a.46.46 0 0 0-.143-.61c-.188-.124-.48-.066-.48.096c0 .05.028.085.09.117c.104.053.111.113.03.236c-.084.124-.077.233.018.307c.154.12.371.054.485-.146M9.82 9.859c-.268.082-.53.365-.61.662c-.05.18-.021.498.053.596c.119.159.234.2.546.198c.612-.004 1.143-.265 1.205-.59c.05-.268-.183-.638-.504-.801c-.166-.084-.52-.117-.69-.065m.715.556c.094-.133.053-.277-.107-.375c-.306-.185-.768-.032-.768.255c0 .143.241.299.462.299c.147 0 .348-.087.413-.18"
        clipRule="evenodd"
      ></path>
    </g>
  </svg>
);

export const WalletConnectIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#3B99FC"
      d="M6.685 8.71c2.935-2.813 7.695-2.813 10.63 0l.353.339a.35.35 0 0 1 0 .51l-1.208 1.158a.194.194 0 0 1-.266 0l-.486-.466c-2.048-1.963-5.368-1.963-7.416 0l-.52.498a.194.194 0 0 1-.266 0L6.297 9.592a.35.35 0 0 1 0-.51zm13.13 2.396l1.075 1.03a.35.35 0 0 1 0 .51l-4.85 4.648a.39.39 0 0 1-.531 0l-3.443-3.299a.097.097 0 0 0-.132 0l-3.442 3.3a.39.39 0 0 1-.532 0l-4.85-4.65a.35.35 0 0 1 0-.508l1.076-1.031a.387.387 0 0 1 .531 0l3.442 3.299a.097.097 0 0 0 .133 0l3.442-3.3a.387.387 0 0 1 .532 0l3.442 3.3a.097.097 0 0 0 .133 0l3.442-3.3a.39.39 0 0 1 .531 0"
    ></path>
  </svg>
);

export const BinanceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#F0B90B"
      d="m7.068 12l-2.03 2.03L3.003 12l2.03-2.03zm4.935-4.935l3.482 3.483l2.03-2.03L12.003 3L6.485 8.518l2.03 2.03zm6.964 2.905L16.937 12l2.03 2.03l2.03-2.03zm-6.964 6.965L8.52 13.452l-2.03 2.03L12.003 21l5.512-5.518l-2.03-2.03zm0-2.905l2.03-2.03l-2.03-2.03L9.967 12z"
    ></path>
  </svg>
);

export const OkxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M3 3h6v6H3zm12 6H9v6H3v6h6v-6h6v6h6v-6h-6zm0 0V3h6v6z"
    ></path>
  </svg>
);

const PhantomIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#AB9FF2"
      d="M5.13 19.2c2.297 0 4.023-1.92 5.053-3.436a2.9 2.9 0 0 0-.195.994c0 .885.53 1.516 1.574 1.516c1.433 0 2.965-1.208 3.758-2.51a2 2 0 0 0-.083.524c0 .617.362 1.006 1.1 1.006c2.324 0 4.663-3.959 4.663-7.421C21 7.175 19.58 4.8 16.016 4.8C9.752 4.8 3 12.154 3 16.905C3 18.771 4.044 19.2 5.13 19.2m8.729-9.622c0-.671.39-1.141.96-1.141c.557 0 .947.47.947 1.14c0 .672-.39 1.155-.947 1.155c-.57 0-.96-.483-.96-1.154m2.979 0c0-.671.39-1.141.96-1.141c.557 0 .947.47.947 1.14c0 .672-.39 1.155-.947 1.155c-.57 0-.96-.483-.96-1.154"
    ></path>
  </svg>
);

const LedgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M0 11.59h8.41V20H0zM0 0h2.46v9.13H0zm4.92 0h9.13v2.46H4.92zM11.59 4.92H20V20h-8.41z"
    ></path>
  </svg>
);

const RainbowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#FF4500"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"
    ></path>
  </svg>
);

const SafeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#12FF80"
      d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V7l-10-5z"
    ></path>
  </svg>
);

const ArgentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#FF875B"
      d="M12 2L3 7v10c0 5.5 3.8 10.7 9 12c5.2-1.3 9-6.5 9-12V7l-9-5z"
    ></path>
  </svg>
);

const ZerionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#2962FF"
      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2z"
    ></path>
  </svg>
);

const ExodusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#0B46F9"
      d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V7l-10-5z"
    ></path>
  </svg>
);

const MathWalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#000000"
      d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V7l-10-5z"
    ></path>
  </svg>
);

const BitKeepIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#8C01FA"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"
    ></path>
  </svg>
);

const CoinomiIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#00A0E9"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"
    ></path>
  </svg>
);

const Crypto1InchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#94A6C3"
      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2z"
    ></path>
  </svg>
);

const TokenPocketIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#2980FE"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"
    ></path>
  </svg>
);

const ImTokenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#11C4D1"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"
    ></path>
  </svg>
);

const KeplrIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#6C4FFF"
      d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V7l-10-5z"
    ></path>
  </svg>
);

const BraveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#FB542B"
      d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V7l-10-5z"
    ></path>
  </svg>
);

const TrezorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#0F6148"
      d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V7l-10-5z"
    ></path>
  </svg>
);

const AtomicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#2A5ADA" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const SafePalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#4A5BDA" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
  </svg>
);

const MyEtherWalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#05C0A5" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const ElectrumIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#3375BB" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const BlockchainComIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#121D33" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const CryptoComIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#002D74" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const GuardaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#2B78FF" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
  </svg>
);

const AlphaWalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#3773F5" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const RabbyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#8697FF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const FrameIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#000000" d="M4 4h16v16H4z"></path>
  </svg>
);

const CosmostationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#6C4FFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const LeapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#CF4420" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const SolflareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#FC541C" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const SlopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#6E66FA" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const GlowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#AB3BFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const XDEFIIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#1D1D1D" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const FrontierIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#CC703C" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const SequenceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#6C5CE7" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const VenlyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#4353FF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const AmbireIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#7F5AF0" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const OperaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#FF1B2D" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const EdgeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#0E2247" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const JaxxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#3F4145" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const StatusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#5B6DEE" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const PillarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#00BFFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const MyCryptoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#007896" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const KeepKeyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#0C1B2E" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
  </svg>
);

const BitBoxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#7C7C7C" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
  </svg>
);

const ColdcardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#FF6B00" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
  </svg>
);

const EllipalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#14B75A" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
  </svg>
);

const EnginIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#7866D5" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const TorusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#0364FF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const OntoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#00BFFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const KuCoinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#24AE8F" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const BybitIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#F7A600" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const GateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#17E3A0" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const HuobiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#2E76DA" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const TallyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#D08E39" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const MagicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="#6851FF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const wallets = [
  {
    name: "MetaMask",
    icon: MetamaskIcon,
    recommended: true,
    bgColor: "from-orange-300 to-orange-500",
    src: "metamask.png",
  },
  {
    name: "Trust Wallet",
    icon: TrustWalletIcon,
    recommended: false,
    bgColor: "from-gray-400 to-gray-200",
    src: "trust.png",
  },
  {
    name: "Phantom",
    icon: PhantomIcon,
    recommended: false,
    bgColor: "from-purple-700 to-purple-500",
    src: "phantom.png",
  },
  {
    name: "Coinbase Wallet",
    icon: CoinbaseIcon,
    recommended: false,
    bgColor: "from-blue-300 to-blue-500",
    src: "coinbase.png",
  },
  {
    name: "Ledger",
    icon: LedgerIcon,
    recommended: false,
    bgColor: "from-gray-800 to-gray-600",
    src: "metamask.png",
  },
  {
    name: "Rainbow",
    icon: RainbowIcon,
    recommended: false,
    bgColor: "from-red-500 to-orange-500",
    src: "trust.png",
  },
  {
    name: "Safe",
    icon: SafeIcon,
    recommended: false,
    bgColor: "from-green-400 to-green-600",
    src: "phantom.png",
  },
  {
    name: "Argent",
    icon: ArgentIcon,
    recommended: false,
    bgColor: "from-orange-400 to-orange-600",
    src: "coinbase.png",
  },
  {
    name: "OKX Wallet",
    icon: OkxIcon,
    recommended: false,
    bgColor: "from-gray-700 to-gray-500",
    src: "okx.png",
  },
  {
    name: "Zerion",
    icon: ZerionIcon,
    recommended: false,
    bgColor: "from-blue-600 to-blue-800",
    src: "metamask.png",
  },
  {
    name: "Exodus",
    icon: ExodusIcon,
    recommended: false,
    bgColor: "from-blue-700 to-purple-900",
    src: "trust.png",
  },
  {
    name: "Uniswap Wallet",
    icon: UniswapIcon,
    recommended: false,
    bgColor: "from-pink-100 to-pink-300",
    src: "uniswap.png",
  },
  {
    name: "Math Wallet",
    icon: MathWalletIcon,
    recommended: false,
    bgColor: "from-gray-800 to-black",
    src: "phantom.png",
  },
  {
    name: "BitKeep",
    icon: BitKeepIcon,
    recommended: false,
    bgColor: "from-purple-600 to-purple-800",
    src: "coinbase.png",
  },
  {
    name: "Binance Wallet",
    icon: BinanceIcon,
    recommended: false,
    bgColor: "from-yellow-800 to-black",
    src: "binance.png",
  },
  {
    name: "Coinomi",
    icon: CoinomiIcon,
    recommended: false,
    bgColor: "from-blue-400 to-blue-600",
    src: "okx.png",
  },
  {
    name: "1inch Wallet",
    icon: Crypto1InchIcon,
    recommended: false,
    bgColor: "from-gray-400 to-gray-600",
    src: "metamask.png",
  },
  {
    name: "TokenPocket",
    icon: TokenPocketIcon,
    recommended: false,
    bgColor: "from-blue-500 to-blue-700",
    src: "trust.png",
  },
  {
    name: "imToken",
    icon: ImTokenIcon,
    recommended: false,
    bgColor: "from-cyan-400 to-cyan-600",
    src: "phantom.png",
  },
  {
    name: "WalletConnect",
    icon: WalletConnectIcon,
    recommended: false,
    bgColor: "from-gray-300 to-gray-100",
    src: "wallet-connect.png",
  },
  {
    name: "Keplr",
    icon: KeplrIcon,
    recommended: false,
    bgColor: "from-purple-500 to-purple-700",
    src: "coinbase.png",
  },
  {
    name: "Brave Wallet",
    icon: BraveIcon,
    recommended: false,
    bgColor: "from-orange-500 to-red-600",
    src: "okx.png",
  },
  {
    name: "Trezor",
    icon: TrezorIcon,
    recommended: false,
    bgColor: "from-green-600 to-green-800",
    src: "metamask.png",
  },
  {
    name: "Atomic Wallet",
    icon: AtomicIcon,
    recommended: false,
    bgColor: "from-blue-600 to-blue-800",
    src: "trust.png",
  },
  {
    name: "SafePal",
    icon: SafePalIcon,
    recommended: false,
    bgColor: "from-indigo-600 to-indigo-800",
    src: "phantom.png",
  },
  {
    name: "MyEtherWallet",
    icon: MyEtherWalletIcon,
    recommended: false,
    bgColor: "from-teal-400 to-teal-600",
    src: "coinbase.png",
  },
  {
    name: "Electrum",
    icon: ElectrumIcon,
    recommended: false,
    bgColor: "from-blue-500 to-blue-700",
    src: "okx.png",
  },
  {
    name: "Blockchain.com",
    icon: BlockchainComIcon,
    recommended: false,
    bgColor: "from-gray-800 to-gray-900",
    src: "metamask.png",
  },
  {
    name: "Crypto.com",
    icon: CryptoComIcon,
    recommended: false,
    bgColor: "from-blue-800 to-blue-950",
    src: "trust.png",
  },
  {
    name: "Guarda Wallet",
    icon: GuardaIcon,
    recommended: false,
    bgColor: "from-blue-500 to-blue-700",
    src: "phantom.png",
  },
  {
    name: "AlphaWallet",
    icon: AlphaWalletIcon,
    recommended: false,
    bgColor: "from-blue-600 to-blue-800",
    src: "coinbase.png",
  },
  {
    name: "Rabby Wallet",
    icon: RabbyIcon,
    recommended: false,
    bgColor: "from-indigo-400 to-indigo-600",
    src: "okx.png",
  },
  {
    name: "Frame",
    icon: FrameIcon,
    recommended: false,
    bgColor: "from-gray-800 to-black",
    src: "metamask.png",
  },
  {
    name: "Cosmostation",
    icon: CosmostationIcon,
    recommended: false,
    bgColor: "from-purple-600 to-purple-800",
    src: "trust.png",
  },
  {
    name: "Leap Wallet",
    icon: LeapIcon,
    recommended: false,
    bgColor: "from-orange-600 to-red-700",
    src: "phantom.png",
  },
  {
    name: "Solflare",
    icon: SolflareIcon,
    recommended: false,
    bgColor: "from-orange-500 to-orange-700",
    src: "coinbase.png",
  },
  {
    name: "Slope",
    icon: SlopeIcon,
    recommended: false,
    bgColor: "from-purple-500 to-purple-700",
    src: "okx.png",
  },
  {
    name: "Glow",
    icon: GlowIcon,
    recommended: false,
    bgColor: "from-purple-600 to-purple-800",
    src: "metamask.png",
  },
  {
    name: "XDEFI Wallet",
    icon: XDEFIIcon,
    recommended: false,
    bgColor: "from-gray-800 to-gray-950",
    src: "trust.png",
  },
  {
    name: "Frontier",
    icon: FrontierIcon,
    recommended: false,
    bgColor: "from-orange-700 to-orange-900",
    src: "phantom.png",
  },
  {
    name: "Sequence",
    icon: SequenceIcon,
    recommended: false,
    bgColor: "from-purple-600 to-purple-800",
    src: "coinbase.png",
  },
  {
    name: "Venly",
    icon: VenlyIcon,
    recommended: false,
    bgColor: "from-indigo-600 to-indigo-800",
    src: "okx.png",
  },
  {
    name: "Ambire Wallet",
    icon: AmbireIcon,
    recommended: false,
    bgColor: "from-purple-700 to-purple-900",
    src: "metamask.png",
  },
  {
    name: "Opera Wallet",
    icon: OperaIcon,
    recommended: false,
    bgColor: "from-red-600 to-red-800",
    src: "trust.png",
  },
  {
    name: "Edge Wallet",
    icon: EdgeIcon,
    recommended: false,
    bgColor: "from-blue-900 to-blue-950",
    src: "phantom.png",
  },
  {
    name: "Jaxx Liberty",
    icon: JaxxIcon,
    recommended: false,
    bgColor: "from-gray-700 to-gray-900",
    src: "coinbase.png",
  },
  {
    name: "Status",
    icon: StatusIcon,
    recommended: false,
    bgColor: "from-indigo-600 to-indigo-800",
    src: "okx.png",
  },
  {
    name: "Pillar Wallet",
    icon: PillarIcon,
    recommended: false,
    bgColor: "from-cyan-500 to-cyan-700",
    src: "metamask.png",
  },
  {
    name: "MyCrypto",
    icon: MyCryptoIcon,
    recommended: false,
    bgColor: "from-teal-700 to-teal-900",
    src: "trust.png",
  },
  {
    name: "KeepKey",
    icon: KeepKeyIcon,
    recommended: false,
    bgColor: "from-gray-800 to-gray-950",
    src: "phantom.png",
  },
  {
    name: "BitBox",
    icon: BitBoxIcon,
    recommended: false,
    bgColor: "from-gray-600 to-gray-800",
    src: "coinbase.png",
  },
  {
    name: "Coldcard",
    icon: ColdcardIcon,
    recommended: false,
    bgColor: "from-orange-600 to-orange-800",
    src: "okx.png",
  },
  {
    name: "Ellipal",
    icon: EllipalIcon,
    recommended: false,
    bgColor: "from-green-500 to-green-700",
    src: "metamask.png",
  },
  {
    name: "Enjin Wallet",
    icon: EnginIcon,
    recommended: false,
    bgColor: "from-purple-600 to-purple-800",
    src: "trust.png",
  },
  {
    name: "Torus",
    icon: TorusIcon,
    recommended: false,
    bgColor: "from-blue-600 to-blue-800",
    src: "phantom.png",
  },
  {
    name: "Onto Wallet",
    icon: OntoIcon,
    recommended: false,
    bgColor: "from-cyan-500 to-cyan-700",
    src: "coinbase.png",
  },
  {
    name: "KuCoin Wallet",
    icon: KuCoinIcon,
    recommended: false,
    bgColor: "from-green-500 to-green-700",
    src: "okx.png",
  },
  {
    name: "Bybit Wallet",
    icon: BybitIcon,
    recommended: false,
    bgColor: "from-yellow-600 to-yellow-800",
    src: "metamask.png",
  },
  {
    name: "Gate.io Wallet",
    icon: GateIcon,
    recommended: false,
    bgColor: "from-emerald-400 to-emerald-600",
    src: "trust.png",
  },
  {
    name: "Huobi Wallet",
    icon: HuobiIcon,
    recommended: false,
    bgColor: "from-blue-700 to-blue-900",
    src: "phantom.png",
  },
  {
    name: "Tally Ho",
    icon: TallyIcon,
    recommended: false,
    bgColor: "from-orange-700 to-orange-900",
    src: "coinbase.png",
  },
  {
    name: "Magic",
    icon: MagicIcon,
    recommended: false,
    bgColor: "from-purple-700 to-purple-900",
    src: "okx.png",
  },
];

export interface WalletDetailsProps {
  name: string;
  icon: React.ComponentType;
  recommended?: boolean;
  bgColor: string;
  src?: string;
}

interface WalletListProps {
  onWalletSelect: (walletName: WalletDetailsProps) => void;
  disabled?: boolean;
}

export function WalletList({
  onWalletSelect,
  disabled = false,
}: WalletListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter wallets based on search query
  const filteredWallets = wallets.filter((wallet) =>
    wallet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full sm:w-80 bg-black/60 border-b sm:border-b-0 sm:border-r border-gray-700 flex flex-col">
      <div className="p-3 sm:p-6 pb-2 sm:pb-3 border-b border-gray-700/50">
        <h2 className="text-white font-semibold text-lg">Select Wallet</h2>
        <p className="text-gray-400 text-xs mt-1 mb-3">Choose your preferred wallet to connect</p>
        
        {/* Search Input */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Input
            type="text"
            placeholder="Search wallets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 pt-3">
        {filteredWallets.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
            {filteredWallets.map((wallet) => {
              const IconComponent = wallet.icon;
              return (
                <Button
                  key={wallet.name}
                  variant="ghost"
                  className="w-full justify-start p-2 sm:p-3 h-auto text-left hover:bg-gray-800/50 group transition-all duration-200"
                  onClick={() => onWalletSelect(wallet)}
                  disabled={disabled}
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3 w-full">
                    <div
                      className={`w-7 h-7 bg-gradient-to-br ${wallet.bgColor} rounded-lg flex items-center justify-center p-1 shadow-lg group-hover:scale-110 transition-transform duration-200`}
                    >
                      <Image
                        src={wallet.src}
                        alt={wallet.name}
                        width="80"
                        height="80"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-white group-hover:text-gray-200 text-xs text-center sm:text-left font-medium">
                      {wallet.name}
                    </span>
                    {wallet.recommended && (
                      <Badge className="sm:ml-auto bg-green-600 hover:bg-green-600 text-white text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 whitespace-nowrap">
                        RECOMMENDED
                      </Badge>
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <svg
              className="w-12 h-12 text-gray-600 mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-gray-400 text-sm">No wallets found</p>
            <p className="text-gray-500 text-xs mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
