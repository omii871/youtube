<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { Container, Title, Tabs, Text } from '@bsf/force-ui';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { cn } from '@/functions/utils';
import ContentAnalysisTable from './content-analysis-table';
import Section from './section';
import { STORE_NAME } from '@/admin-store/constants';
import { useSelect } from '@wordpress/data';
import EmptyContentGap from './empty-content-gap';

const CONTENT_PERFORMANCE_TABS = {
	analysis: {
		label: __( 'Content Analysis', 'surerank' ),
	},
	gap: {
		label: __( 'Content Gap', 'surerank' ),
	},
};

const ContentPerformance = () =&gt; {
	const [ activeTab, setActiveTab ] = useState( 'analysis' );

	// Get search consolee data
	const {
		contentPerformance = [],
		authenticated,
		hasSiteSelected,
	} = useSelect( ( select ) =&gt; select( STORE_NAME ).getSearchConsole() );

	// Displaying the last 90 days badge only when the user is authenticated,
	const Show_Period_Badge =
		authenticated &amp;&amp; hasSiteSelected &amp;&amp; contentPerformance.length &gt; 0;

	return (
		<section>
			<tabs activeitem="{" activetab>
				<container justify="between" align="center" classname="py-2 pl-2 pr-3 flex-wrap md:flex-nowrap">
					<container align="center" classname="gap-2">
						<title title="{" __ performance tag="h4" size="md"></title>

						{ Show_Period_Badge &amp;&amp; (
							<text size="{" weight="{" color="secondary">
								{ __( '(Last 90 days)', 'surerank' ) }
							</text>
						) }
					</container>
					<container.item classname="w-fit block">
						<tabs.group activeitem="{" activetab onchange="{" value: slug> {
								setActiveTab( slug );
							} }
							size="sm"
							variant="rounded"
						&gt;
							{ Object.entries( CONTENT_PERFORMANCE_TABS ).map(
								( [ key, tab ] ) =&gt; (
									<tabs.tab key="{" slug="{" text="{" tab.label classname="{" cn text-nowrap space-x-1.5 activetab="==" hover:text-brand-800 badge="{" null disabled tab.disabled></tabs.tab>
								)
							) }
						</tabs.group>
					</container.item>
				</container>
				<tabs.panel slug="analysis">
					<contentanalysistable></contentanalysistable>
				</tabs.panel>
				<tabs.panel slug="gap">
					<emptycontentgap></emptycontentgap>
				</tabs.panel>
			</tabs>
		</section>
	);
};

export default ContentPerformance;
</p></body></html>
