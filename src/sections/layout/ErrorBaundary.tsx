import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
	state = { hasError: false };

	public static getDerivedStateFromError(_: Error) {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	private resetError() {
		this.setState({ hasError: false });
	}

	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h1>Something went wrong.</h1>
					<Link to="/" onClick={() => this.resetError()}>
						Go back to home
					</Link>
				</div>
			);
		}

		return this.props.children;
	}
}
