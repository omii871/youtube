<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { useSelect, useDispatch } from '@wordpress/data';
import { ExclamationTriangleColorfulIcon } from '../ui/icons';
import { STORE_KEY } from '../store';
import Modal from './modal';
import ModalTitle from './modal-title';
import Button from './button';
import { __, sprintf } from '@wordpress/i18n';

const ApiErrorModel = ( { onOpenChange } ) =&gt; {
	const { setApiErrorModal } = useDispatch( STORE_KEY );

	const { apiErrorModal } = useSelect( ( select ) =&gt; {
		const { getApiErrorModalInfo } = select( STORE_KEY );

		return {
			apiErrorModal: getApiErrorModalInfo(),
		};
	} );

	return (
		<modal open="{" apierrormodal.open setopen="{" toggle> {
				if ( typeof onOpenChange === 'function' ) {
					onOpenChange( toggle );
				}

				setApiErrorModal( {
					...apiErrorModal,
					open: toggle,
				} );
			} }
			width={ 550 }
			height="200"
			overflowHidden={ false }
		&gt;
			<modaltitle>
				<exclamationtrianglecolorfulicon classname="w-10 h-10"></exclamationtrianglecolorfulicon>
				<span>{ __( 'Something went wrong', 'ai-builder' ) }</span>
			</modaltitle>
			<div classname="space-y-8">
				<div classname="text-app-text text-base leading-6 space-y-6">
					<span>
						{ __(
							'Site creation failed due to an unexpected error. Please try again or reach out for assistance if the issue persists.',
							'ai-builder'
						) }
					</span>
					<div classname="text-app-text text-base !font-semibold leading-6">
						{ __(
							'Additional technical information:',
							'ai-builder'
						) }
					</div>
					<div>
						{ sprintf(
							/* translators: %s: message */
							__( 'Error Message: %1$s', 'ai-builder' ),
							apiErrorModal.message
						) }
					</div>

					{ apiErrorModal?.error &amp;&amp; (
						<div classname="p-4 border border-red-400 rounded-md bg-red-50 overflow-auto max-h-96">
							<pre classname="p-2 whitespace-pre-wrap rounded-md  overflow-auto max-h-full">
								{ JSON.stringify(
									apiErrorModal.error,
									null,
									2
								) }
							</pre>
						</div>
					) }
				</div>
				<div classname="items-center gap-3 justify-center mt-4">
					<button onclick="{"> {
							window.location.href = aiBuilderVars.dashboard_url;
						} }
						variant="primary"
						size="base"
						className="w-full"
					&gt;
						<div classname="flex items-center justify-center gap-2">
							{ __( 'Exit to Dashboard', 'ai-builder' ) }
						</div>
					</button>
					<a href="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/ai-builder/inc/assets/src/components/%7B" aibuildervars.filtered_data.contact_url classname="group flex items-center justify-center mt-6 text-base" target="_blank" rel="noopener noreferrer">
						{ aiBuilderVars.filtered_data.contact_text }
					</a>
				</div>
			</div>
		</modal>
	);
};

export default ApiErrorModel;
</p></body></html>
