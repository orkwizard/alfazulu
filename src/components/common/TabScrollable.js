import { useRef } from "react";

function TabScrollable({items, activeIndex, setActiveIndex}){
    const refScroll = useRef(null);
    
    
    const scrollLeft = () =>{
        refScroll.current.scrollLeft-=150
    }
    const scrollRight = () =>{
        refScroll.current.scrollLeft+=150
    }

    const onHandleClick = (index) =>{
        setActiveIndex(index)
    }

    return (
        <div className="container-scroller">
            <div className="tabs-scroller flex-grow-1" ref={refScroll}>
                {
                    items.map((item, index)=>(
                        <button 
                            className={`btn-scroller ${index===activeIndex ? 'active' : ''}`}
                            key={index}
                            onClick={e=>onHandleClick(index)}
                        >
                            {item.title}
                        </button>
                    ))
                }
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <div className="me-1">
                    <button className="btn-arrows" onClick={scrollLeft}><i className="dripicons-chevron-left"></i></button>
                </div>
                <div className="ms-1">
                    <button className="btn-arrows"onClick={scrollRight}><i className="dripicons-chevron-right"></i></button>
                </div>
            </div>
        </div>
        
    )
}

export default TabScrollable