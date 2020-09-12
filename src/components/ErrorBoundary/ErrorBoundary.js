import React from 'react';
import EmptySpace from '../EmptySpace/EmptySpace';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <EmptySpace message='Something went wrong, Kindly refresh your browser or contact the developer' />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
