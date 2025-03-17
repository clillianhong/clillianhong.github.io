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

const Cell: React.FC<CellProps> = ({ data }) => (
    <div className="cell-container">
        <article className="mini-post" >
            <header>
                <h3>
                    <a href={data.link}>{data.title}</a>
                </h3>
                <h4 className="published">
                    {data.subtitle}
                </h4>
                <time className="published">
                    {dayjs(data.date).format('MMMM, YYYY')}
                </time>
            </header>
            <a href={data.link} className="image">
                <img src={`${process.env.PUBLIC_URL}${data.image}`} alt={data.title} />
            </a>
            <div className="description">
                <p>{data.desc}</p>
            </div>
        </article>
    </div>
);

export default Cell;
