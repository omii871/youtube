<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { __, sprintf } from '@wordpress/i18n';
import Button from '../components/button';
import { useDispatch } from '@wordpress/data';
import { ExclamationTriangleColorfulIcon } from '../ui/icons';
import { Component } from 'react';
import { STORE_KEY } from '../store';

class ErrorBoundary extends Component {
	constructor( props ) {
		super( props );
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch( error, errorInfo ) {
		console.error( 'ErrorBoundary caught an error', error, errorInfo );
	}

	retryStep = () =&gt; {};
	handleClosePopUop = ( event ) =&gt; {
		event?.preventDefault();
		event?.stopPropagation();
		window.location.href = `${ aiBuilderVars.adminUrl }`;
	};
	render() {
		if ( this.state.hasError ) {
			return (
				</p><div classname="h-screen w-full grid grid-cols-1 grid-rows-[80px_1fr]">
					<div classname="grid grid-cols-1 auto-rows-min gap-4 w-full max-w-[590px] my-32 mx-auto text-center px-5 lg:px-0">
						<div classname="space-y-3">
							<exclamationtrianglecolorfulicon classname="mx-auto w-6 h-6"></exclamationtrianglecolorfulicon>
							<h5>
								{ __(
									'Oops , Something went wrong!',
									'ai-builder'
								) }
							</h5>
							<p classname="text-zip-body-text" dangerouslysetinnerhtml="{" __html: sprintf translators: contact us link __ was a problem processing the request. please try again. if this error continues our href="%1%24s">support team.',
											'ai-builder'
										),
										`${ aiBuilderVars.supportLink }`
									),
								} }
							&gt;</p>
						</div>
						<div classname="flex justify-center space-x-4">
							<button type="button" variant="primary" classname="mt-4 w-fit mx-auto" issmall onclick="{" this.handleclosepopuop>
								{ __( 'Back to Main Screen', 'ai-builder' ) }
							</button>
						</div>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}

// Functional wrapper component to use the dispatch hook
const ErrorBoundaryWrapper = ( props ) =&gt; {
	const { toggleOnboardingAIStep } = useDispatch( STORE_KEY );

	return (
		<errorboundary ...props toggleonboardingaistep="{"></errorboundary>
	);
};

export default ErrorBoundaryWrapper;
</body></html>
