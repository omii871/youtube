<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import {
	Container,
	Title,
	Tabs,
	Text,
	Table,
	Badge,
	ProgressBar,
	Button,
} from '@bsf/force-ui';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import Section from './section';
import EmptyContentGap from './empty-content-gap';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/functions/utils';

const CONTENT_PERFORMANCE_TABS = {
	analysis: { label: __( 'Content Analysis', 'surerank' ) },
	gap: { label: __( 'Content Gap', 'surerank' ) },
};

const dummyData = [
	{
		url: 'https://example.com/blog/seo-guide',
		status: 'Top Ranked',
		statusVariant: 'green',
		clicks: 3200,
		position: 5.2,
		impressions: 25000,
		contentScore: 88,
	},
	{
		url: 'https://example.com/blog/wordpress-performance',
		status: 'On the Rise',
		statusVariant: 'yellow',
		clicks: 1800,
		position: 14.6,
		impressions: 12000,
		contentScore: 72,
	},
	{
		url: 'https://example.com/blog/content-writing-tips',
		status: 'Low Visibility',
		statusVariant: 'neutral',
		clicks: 500,
		position: 38.1,
		impressions: 4000,
		contentScore: 55,
	},
	{
		url: 'https://example.com/blog/seo-guide',
		status: 'Top Ranked',
		statusVariant: 'green',
		clicks: 3200,
		position: 5.2,
		impressions: 25000,
		contentScore: 88,
	},
	{
		url: 'https://example.com/blog/seo-guide',
		status: 'Top Ranked',
		statusVariant: 'green',
		clicks: 3200,
		position: 5.2,
		impressions: 25000,
		contentScore: 88,
	},
];

const ContentPerformanceDummy = () =&gt; {
	const [ activeTab, setActiveTab ] = useState( 'analysis' );

	return (
		<section>
			<tabs activeitem="{" activetab>
				<container justify="between" align="center" classname="py-2 pl-2 pr-3 flex-wrap md:flex-nowrap">
					<container align="center" classname="gap-2">
						<title title="{" __ performance tag="h4" size="md"></title>
						<text size="{" weight="{" color="secondary">
							{ __( '(Last 90 days)', 'surerank' ) }
						</text>
					</container>
					<container.item classname="w-fit block">
						<tabs.group activeitem="{" activetab onchange="{" value: slug>
								setActiveTab( slug )
							}
							size="sm"
							variant="rounded"
						&gt;
							{ Object.entries( CONTENT_PERFORMANCE_TABS ).map(
								( [ key, tab ] ) =&gt; (
									<tabs.tab key="{" slug="{" text="{" tab.label classname="{" cn text-nowrap space-x-1.5 activetab="=="></tabs.tab>
								)
							) }
						</tabs.group>
					</container.item>
				</container>

				<tabs.panel slug="analysis">
					<table>
						<table.head>
							<table.headcell>
								{ __( 'Page', 'surerank' ) }
							</table.headcell>
							<table.headcell>
								{ __( 'Status', 'surerank' ) }
							</table.headcell>
							<table.headcell>
								{ __( 'Clicks', 'surerank' ) }
							</table.headcell>
							<table.headcell>
								{ __( 'Avg. Position', 'surerank' ) }
							</table.headcell>
							<table.headcell>
								{ __( 'Impressions', 'surerank' ) }
							</table.headcell>
							<table.headcell>
								{ __( 'Content Score', 'surerank' ) }
							</table.headcell>
							<table.headcell>
								<span classname="sr-only">
									{ __( 'Actions', 'surerank' ) }
								</span>
							</table.headcell>
						</table.head>
						<table.body>
							{ dummyData.map( ( item, index ) =&gt; (
								<table.row key="{" index>
									<table.cell>
										<text target="_blank" classname="text-xs line-clamp-1">
											{ item.url }
										</text>
									</table.cell>
									<table.cell>
										<badge size="xs" variant="{" item.statusvariant label="{" item.status disablehover></badge>
									</table.cell>
									<table.cell>
										<span classname="text-xs">
											{ item.clicks.toLocaleString() }
										</span>
									</table.cell>
									<table.cell>
										<span classname="text-xs">
											{ item.position.toFixed( 2 ) }
										</span>
									</table.cell>
									<table.cell>
										<span classname="text-xs">
											{ item.impressions.toLocaleString() }
										</span>
									</table.cell>
									<table.cell>
										<container direction="column" classname="gap-1.5">
											<span classname="text-xs">
												{ __(
													'Out of 100',
													'surerank'
												) }
											</span>
											<progressbar progress="{" item.contentscore classname="{" cn max-w-32>div]:bg-gray-400'
												) }
											/&gt;
										</progressbar></container>
									</table.cell>
									<table.cell>
										<button size="xs" variant="ghost" icon="{" classname="size-4"></button>
											}
											iconPosition="right"
										&gt;
											{ __( 'View', 'surerank' ) }
										
									</table.cell>
								</table.row>
							) ) }
						</table.body>
					</table>
				</tabs.panel>

				<tabs.panel slug="gap">
					<emptycontentgap></emptycontentgap>
				</tabs.panel>
			</tabs>
		</section>
	);
};

export default ContentPerformanceDummy;
</p></body></html>
