<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { __ } from '@wordpress/i18n';
import { classNames, copyToClipboard } from '../utils/helpers';
import { ExternalLinkIcon } from '../ui/icons';

const SiteLoginCredentials = ( {
	url,
	wp_user,
	wp_password,
	variant = 'dark',
	className = '',
	hideTitle = false,
	hideCopyIcon = false,
} ) =&gt; {
	const bgClassName = {
		dark: 'bg-dark-app-container',
		light: 'bg-white',
	};
	const textClassName = {
		dark: {
			heading: 'text-dark-app-heading',
			text: 'text-dark-app-text',
		},
		light: {
			heading: 'text-app-heading',
			text: 'text-app-text',
		},
	};
	const borderClassName = {
		dark: 'border-dark-app-border',
		light: 'border-app-border-hover',
	};

	const copyLoginCredentials = ( event ) =&gt; {
		copyToClipboard(
			`URL: ${ url }/wp-admin\nUsername: ${ wp_user }\nPassword: ${ wp_password }`
		);

		const copyTextNode =
			event.target.closest( 'div#zw-copy-info' ).firstChild;

		if ( ! copyTextNode ) {
			return;
		}

		copyTextNode.innerText = 'Copied!';
		setTimeout( () =&gt; {
			copyTextNode.innerText = 'Copy';
		}, 3000 );
	};

	return (
		</p><div classname="{" classnames w-full px-8 py-6 bg-dark-app-container border border-dark-app-border rounded-md flex flex-col gap-3 flex-1 bgclassname variant borderclassname>
			<div classname="flex items-center gap-2">
				{ ! hideTitle &amp;&amp; (
					<h4 classname="{" classnames textclassname variant>
						{ __( 'Login credentials:', 'ai-builder' ) }
					</h4>
				) }
				{ ! hideCopyIcon &amp;&amp; (
					<div id="zw-copy-info" classname="{" classnames items-center justify-center gap-1.5 py-1 pl-2 pr-1.5 h-6 w-fit rounded border border-dark-app-border bg-dark-app-container cursor-pointer bgclassname variant borderclassname onclick="{" copylogincredentials>
						<p classname="{" classnames text-dark-app-text textclassname variant>
							{ __( 'Copy', 'ai-builder' ) }
						</p>
						<documentduplicateicon classname="w-4 h-4 text-app-inactive-icon"></documentduplicateicon>
					</div>
				) }
			</div>
			<div classname="flex items-center gap-2">
				<p classname="{" classnames text-dark-app-heading textclassname variant>
					{ __( 'URL:', 'ai-builder' ) }
				</p>
				<a href="https://omii871.github.io/youtube/wp-content/plugins/astra-sites/inc/lib/ai-builder/inc/assets/src/components/%7B" url classname="group overflow-ellipsis whitespace-nowrap text-app-heading overflow-hidden flex items-center gap-2" target="_blank" rel="noreferrer">
					<p classname="{" classnames truncate zw-base-normal text-dark-app-text textclassname variant>
						{ url }
					</p>

					<externallinkicon classname="text-app-inactive-icon shrink-0"></externallinkicon>
				</a>
			</div>
			<div classname="flex items-center gap-2">
				<p classname="{" classnames text-dark-app-heading textclassname variant>
					{ __( 'Username:', 'ai-builder' ) }
				</p>
				<div classname="flex items-center gap-2">
					<p classname="{" classnames zw-base-normal text-dark-app-text textclassname variant>
						{ wp_user }
					</p>
					<documentduplicateicon classname="w-4 h-4 text-app-inactive-icon cursor-pointer" onclick="{"> {
							copyToClipboard( wp_user );
						} }
					/&gt;
				</documentduplicateicon></div>
			</div>
			<div classname="flex items-center gap-2">
				<p classname="{" classnames text-dark-app-heading textclassname variant>
					{ __( 'Password:', 'ai-builder' ) }
				</p>
				<div classname="flex items-center gap-2">
					<p classname="{" classnames zw-base-normal text-dark-app-text textclassname variant>
						{ wp_password }
					</p>
					<documentduplicateicon classname="w-4 h-4 text-app-inactive-icon cursor-pointer" onclick="{"> {
							copyToClipboard( wp_password );
						} }
					/&gt;
				</documentduplicateicon></div>
			</div>
		</div>
	);
};

export default SiteLoginCredentials;
</body></html>
