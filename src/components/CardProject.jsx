import {memo} from "react";
import {Link} from "react-router-dom";

const CardProject = ({data, slug, scale = 1, rotate = 0}) => {

    return (
        <Link to={slug} className="cornerBorder" style={{transform: `rotate(${rotate}deg) scale(${scale})`}}>
            <div className="top"></div>
            <div className="bottom"></div>
            <div className="firstBorder">
                <div className="cardProject">
                    <figure className='cardProject--left'>
                        <img src={data?.main_image?.sizes?.large} alt={data?.name}/>
                    </figure>
                    <div className='cardProject--right'>
                        <div className='w100'>
                            {data?.year && (
                                <h3 className='gray-200' style={{fontWeight: 600, textAlign: 'right'}}>{data?.year}</h3>
                            )}
                        </div>
                        <div className='dflexcolumn gap16 w100'>
                            {data?.tag && data?.tag?.length > 0 && (
                                <div className='dflexrow gap8 wrap w100'>
                                    {data?.tag.map((tag, index) => (
                                        <div className='tag' key={index}>
                                            <h6 className='regular16' key={index}>{tag?.value}</h6>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <h2 className='titre1 gradientTitre gradientTitreGray'>{data?.name}</h2>
                        </div>
                        <figure className='backgroundCardImage'>
                            <img src={data?.main_image?.sizes?.large} alt={data?.name}/>
                        </figure>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default memo(CardProject)