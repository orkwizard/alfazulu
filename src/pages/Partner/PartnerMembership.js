import { useEffect } from "react";
import { MetaTags } from "react-meta-tags";
import { withRouter } from "react-router";

const PartnerMembership = props =>{
    const {
        match: { params },
    } = props;

    useEffect(() => {
        console.log(params.id)
    }, [params]);

    return (
        <>
            <div className="page-content">
                <MetaTags>
                    <title>Partner Membership | AlphaZulu CRM</title>
                </MetaTags>
            </div>
        </>
    )
}

export default withRouter(PartnerMembership);