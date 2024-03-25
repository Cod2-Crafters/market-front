import { Icon } from '@iconify/react';
import React from 'react';
import type { SVGProps } from 'react';

export function LeftArrow(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" className='w-full h-full' viewBox="0 0 2048 2048"><path fill="currentColor" d="M1980 964q0 41-15 77t-43 63t-63 42t-77 16H739l281 280q28 27 43 64t15 76q0 41-15 77t-43 63t-63 42t-77 16q-39 0-75-15t-65-43l-615-616q-33-33-47-68t-14-82q0-39 17-73t44-61l615-616q28-28 65-43t76-15q41 0 77 16t62 43t42 63t16 77q0 39-15 75t-43 64L739 766h1043q41 0 77 15t63 43t42 63t16 77"></path></svg>);
}

export function RightArrow(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" className='w-full h-full' viewBox="0 0 1472 1600"><g transform="translate(1472 0) scale(-1 1)"><path fill="currentColor" d="M1472 736v128q0 53-32.5 90.5T1355 992H651l293 294q38 36 38 90t-38 90l-75 76q-37 37-90 37q-52 0-91-37L37 890Q0 853 0 800q0-52 37-91L688 59q38-38 91-38q52 0 90 38l75 74q38 38 38 91t-38 91L651 608h704q52 0 84.5 37.5T1472 736"></path></g></svg>);
}

export function offHeart() {
	return <Icon icon="mdi:heart" />;
}

export function facebook() {
	return <Icon icon="devicon:facebook" />;
}

export function naver() {
	return <Icon icon="arcticons:naver-cafe" style={{ color: ' #37ff00' }} />;
}

export function follow() {
	return <Icon icon="carbon:user-follow" />;
}

export function tag() {
	return <Icon icon="mdi:tag" />;
}

export function filterImg() {
	return <Icon icon="mi:filter" />
}