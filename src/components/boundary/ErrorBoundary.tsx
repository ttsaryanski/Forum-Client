import { Component, ReactNode, ErrorInfo } from "react";

import Boundary from "./Boundary";

interface BoundryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}
interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<BoundryProps, State> {
    constructor(props: BoundryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
        console.error("Caught by Error Boundary:", error);
        return { hasError: true };
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return <Boundary />;
        }
        return this.props.children;
    }
}
