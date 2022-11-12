import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css'
import noImage from '../../assets/images/no-image.png'

export default function GalleryPhotos({images}){
    console.log(images)

    return (
        <Gallery>
            <div
                style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto auto',
                gridTemplateRows: '109px 109px',
                gridGap: 12,
                }}
            >
                {
                    images.map((item, index) => (
                        <Item
                            original={item.url ? item.url.replace(/ /g, '') : noImage}
                            thumbnail={item.url ? item.url.replace(/ /g, '') : noImage}
                            width="1600"
                            height="1068"
                            alt="Photo"
                            key={index}
                        >
                        {({ ref, open }) => (
                            <img
                                className={
                                    index === 0 ?
                                    'firstImageStyle' :
                                    'smallItemStyles'
                                }
                                style={{display: index > 5 ? 'none' : ''}}
                                src={item.url ? item.url.replace(/ /g, '') : noImage}
                                ref={ref}
                                onClick={open}
                                alt={`imagen-${index}`}
                            />
                        )}
                        </Item>
                    ))
                }
            </div>
    </Gallery>
    )
}