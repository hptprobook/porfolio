import { Params, useLocation, useNavigate, useParams } from "react-router-dom";

interface WithRouterProps {
    location: ReturnType<typeof useLocation>;
    params: Readonly<Params<string>>;
    navigate: ReturnType<typeof useNavigate>;
}

function withRouter<T>(Component: React.ComponentType<T & WithRouterProps>) {
    function ComponentWithRouterProp(props: T) {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        return (
            <Component
                {...props}
                location={location}
                params={params}
                navigate={navigate}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default withRouter;
