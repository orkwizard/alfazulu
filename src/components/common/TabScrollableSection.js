function TabScrollableSection({components, activeIndex}){


    return (
        <>
            {
                components.map((component, index)=>(
                    <div key={index} className={`${activeIndex!==index ? 'd-none' : ''}`}>
                        {component.component}
                    </div>
                ))
            }
        </>
    )
}

export default TabScrollableSection