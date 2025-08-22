<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { STORE_NAME } from '@/admin-store/constants';
import {
	Button,
	Text,
	Table,
	Badge,
	ProgressBar,
	Container,
} from '@bsf/force-ui';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import ContentPerformanceEmptyState from './content-performance-empty-state';

const dummyRows = [
	{
		url: 'https://surerank.com/',
		status: 'Low Visibility',
		statusVariant: 'neutral',
		clicks: '30,967',
		position: '60.79',
		impressions: '1,870,391',
		contentScore: 50,
	},
	{
		url: 'https://surerank.com/docs/install-premium-starter-templates/',
		status: 'Top Ranked',
		statusVariant: 'green',
		clicks: '1,278',
		position: '8.06',
		impressions: '41,176',
		contentScore: 84,
	},
	{
		url: 'https://surerank.com/docs/fix-starter-template-importing-&hellip;',
		status: 'Top Ranked',
		statusVariant: 'green',
		clicks: '1,122',
		position: '9.49',
		impressions: '17,814',
		contentScore: 80,
	},
	{
		url: 'https://surerank.com/docs/getting-started-starter-templates/',
		status: 'Low Visibility',
		statusVariant: 'neutral',
		clicks: '855',
		position: '47.80',
		impressions: '236,183',
		contentScore: 45,
	},
	{
		url: 'https://surerank.com/docs/install-starter-templates/',
		status: 'Top Ranked',
		statusVariant: 'green',
		clicks: '469',
		position: '6.77',
		impressions: '65,364',
		contentScore: 76,
	},
];

const getExtendedRows = ( rowsCount = 5 ) =&gt; {
	const times = Math.ceil( rowsCount / dummyRows.length );
	return Array( times ).fill( dummyRows ).flat().slice( 0, rowsCount );
};

const EmptyContentGap = ( { rows = 5, overlayFixed = false } ) =&gt; {
	const { hasSiteSelected } = useSelect( ( select ) =&gt;
		select( STORE_NAME ).getSearchConsole()
	);

	if ( ! hasSiteSelected ) {
		return <contentperformanceemptystate></contentperformanceemptystate>;
	}

	const data = rows &gt; dummyRows.length ? getExtendedRows( rows ) : dummyRows;
	const overlayHeightClass = overlayFixed ? 'h-[600px]' : 'h-[400px]';

	return (
		</p><div classname="{" w-full px-0 py-8 rows="==" :>
			<div classname="{" top-0 left-1 transform z-10 flex flex-col items-center justify-center text-center px-4 max-w-2xl pointer-events-none overlayheightclass>
				<img src="https://omii871.github.io/youtube/wp-content/plugins/surerank/src/apps/admin-dashboard/%7B" surerank_globals.admin_assets_url alt="{" __ gap illustration classname="w-25 h-25 mb-3">
				<text tag="h2" size="{" lineheight="{" classname="mb-1">
					{ __(
						'Unlock Competitor Insights with Content Gap',
						'surerank'
					) }
				</text>
				<text size="{" color="secondary" lineheight="{" classname="line-clamp-2 mb-3">
					{ __(
						'Discover the topics your competitors rank for but you&rsquo;re missing. Find high-traffic opportunities and close the gap with data-backed content strategies.',
						'surerank'
					) }
				</text>
				<button variant="primary" size="md" onclick="{">
						window.open( surerank_globals.pricing_link, '_blank' )
					}
					className="pointer-events-auto"
				&gt;
					{ __( 'Upgrade to View Full Report', 'surerank' ) }
				</button>
			</div>

			{ /* Blurred Table Section */ }
			<div classname="absolute inset-0 z-0 pointer-events-none flex justify-center">
				<div classname="blur-[7px] w-full overflow-hidden">
					<table>
						<table.head>
							<table.headcell classname="w-[35%] max-w-120 min-w-80">
								{ __( 'Page', 'surerank' ) }
							</table.headcell>
							<table.headcell classname="w-1/10">
								{ __( 'Status', 'surerank' ) }
							</table.headcell>
							<table.headcell classname="w-[12%]">
								{ __( 'Clicks', 'surerank' ) }
							</table.headcell>
							<table.headcell classname="w-[12%] text-nowrap">
								{ __( 'Avg. Position', 'surerank' ) }
							</table.headcell>
							<table.headcell classname="w-[12%]">
								{ __( 'Impressions', 'surerank' ) }
							</table.headcell>
							<table.headcell classname="min-w-[10rem] text-nowrap">
								<container align="center" classname="gap-1">
									<span classname="text-text-tertiary">
										{ __( 'Content Score', 'surerank' ) }
									</span>
									<badge classname="w-fit" size="xs" variant="blue" label="{" __></badge>
								</container>
							</table.headcell>
							<table.headcell classname="min-w-[10%]">
								<span classname="sr-only">
									{ __( 'Actions', 'surerank' ) }
								</span>
							</table.headcell>
						</table.head>
						<table.body>
							{ data.map( ( row, index ) =&gt; (
								<table.row key="{" index>
									<table.cell>
										<text color="secondary" classname="line-clamp-1 no-underline text-xs font-thin text-text-tertiary" target="_blank">
											{ row.url }
										</text>
									</table.cell>
									<table.cell>
										<badge classname="w-fit" size="xs" variant="{" row.statusvariant label="{" row.status disablehover disabled true></badge>
									</table.cell>
									<table.cell>
										<span classname="text-xs font-thin text-text-tertiary">
											{ row.clicks }
										</span>
									</table.cell>
									<table.cell>
										<span classname="text-xs font-thin text-text-tertiary">
											{ row.position }
										</span>
									</table.cell>
									<table.cell>
										<span classname="text-xs font-thin text-text-tertiary">
											{ row.impressions }
										</span>
									</table.cell>
									<table.cell>
										<container direction="column" classname="gap-1.5">
											<span classname="text-xs font-thin text-text-tertiary">
												{ __(
													'Out of 100',
													'surerank'
												) }
											</span>
											<progressbar progress="{" classname="w-full max-w-32"></progressbar>
										</container>
									</table.cell>
									<table.cell>
										<button size="xs" variant="outline" disabled>
											{ __( 'View', 'surerank' ) }
										</button>
									</table.cell>
								</table.row>
							) ) }
						</table.body>
					</table>
				</div>
			</div>
		</div>
	);
};

export default EmptyContentGap;
</body></html>
