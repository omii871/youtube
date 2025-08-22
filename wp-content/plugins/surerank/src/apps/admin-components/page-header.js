<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { Container, Text, Title } from '@bsf/force-ui';
import { useSelect } from '@wordpress/data';
import { STORE_NAME } from '@AdminStore/constants';
import { InfoTooltip } from './tooltip';
import { useCallback, useEffect } from '@wordpress/element';

const PageHeader = ( {
	title = '',
	description = '',
	icon: Icon = null,
	secondaryButton = null,
	info_tooltip = null,
} ) =&gt; {
	const { unsavedSettings } = useSelect( ( select ) =&gt; {
		const { getUnsavedSettings } = select( STORE_NAME );
		return {
			unsavedSettings: getUnsavedSettings() || {},
		};
	}, [] );

	const hasUnsavedSettings = Object.keys( unsavedSettings || {} ).length &gt; 0;

	// Handle navigation warning for unsaved changes
	const handleBeforeUnload = useCallback(
		( event ) =&gt; {
			event.preventDefault();
			event.returnValue = '';
		},
		[ unsavedSettings ]
	);

	useEffect( () =&gt; {
		if ( ! hasUnsavedSettings ) {
			return;
		}
		window.addEventListener( 'beforeunload', handleBeforeUnload );
		return () =&gt; {
			window.removeEventListener( 'beforeunload', handleBeforeUnload );
		};
	}, [ handleBeforeUnload, hasUnsavedSettings ] );

	return (
		</p><div classname="flex items-center justify-between gap-3 flex-1">
			<container direction="column" classname="gap-0.5">
				<container direction="row" classname="gap-2">
					<title classname="[&amp;_h2]:text-text-primary [&amp;_h2]:leading-[1.875rem]" title="{" icon="{"></title>
							)
						}
						iconPosition="left"
						size="md"
					/&gt;
					{ /* Added the InfoTooltip next to the Title */ }
					{ info_tooltip &amp;&amp; (
						<div classname="mt-[7px]">
							<infotooltip content="{" info_tooltip interactive="{" true></infotooltip>
						</div>
					) }
				</container>
				<text size="{" weight="{" color="secondary">
					{ description }
				</text>
			</container>

			{ !! secondaryButton &amp;&amp; secondaryButton }
		</div>
	);
};

export default PageHeader;
</body></html>
