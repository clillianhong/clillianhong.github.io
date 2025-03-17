import React from 'react';
import dayjs from 'dayjs';

type DataType = {
    title: string;
    link?: string;
    image: string;
    date: string;
    desc: string;
    subtitle?: string;
};

type CellProps = {
    data: DataType;
};


const MOBILE_FONT_SIZE_RATIO = 0.02;
const DESKTOP_FONT_SIZE_RATIO = 0.01;

const Cell: React.FC<CellProps> = ({ data }) => (
    <div className="cell-container">
        <article className="mini-post" >
            <header>
                <h3 style={{fontSize: window.innerWidth < 600 ? window.innerWidth * MOBILE_FONT_SIZE_RATIO : window.innerWidth * DESKTOP_FONT_SIZE_RATIO}}>
                    <a href={data.link}>{data.title}</a>
                </h3>
                <h4 className="published">
                    <p style={{fontSize: window.innerWidth < 600 ? window.innerWidth * MOBILE_FONT_SIZE_RATIO * 0.75: window.innerWidth * DESKTOP_FONT_SIZE_RATIO * 0.75}}>
                        {data.subtitle}
                    </p>
                </h4>

                <time className="published">
                    <p style={{fontSize: window.innerWidth < 600 ? window.innerWidth * MOBILE_FONT_SIZE_RATIO * 0.75: window.innerWidth * DESKTOP_FONT_SIZE_RATIO * 0.75}}>
                        {dayjs(data.date).format('MMMM, YYYY')}
                    </p>
                </time>

            </header>
            <a href={data.link} className="image">
                <img src={`${process.env.PUBLIC_URL}${data.image}`} alt={data.title} />
            </a>
            <div className="description" >
                <p style={{fontSize: window.innerWidth < 600 ? window.innerWidth * MOBILE_FONT_SIZE_RATIO : window.innerWidth * DESKTOP_FONT_SIZE_RATIO}}>{data.desc}</p>
            </div>
        </article>
    </div>
);

export default Cell;
