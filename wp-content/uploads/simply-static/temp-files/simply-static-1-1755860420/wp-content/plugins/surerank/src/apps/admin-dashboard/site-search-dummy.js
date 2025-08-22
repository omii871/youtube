<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { Container, Title, Label, LineChart, Text } from '@bsf/force-ui';
import { __ } from '@wordpress/i18n';
import Section from './section';
import { formatNumber } from '@/functions/utils';

const rawTrafficData = [
	{ clicks: 10000, impressions: 100, date: '2025-02-06' },
	{ clicks: 1000, impressions: 1000, date: '2025-02-07' },
	{ clicks: 10000, impressions: 10000, date: '2025-02-08' },
	{ clicks: 1000, impressions: 10000, date: '2025-02-09' },
	{ clicks: 10000, impressions: 1000, date: '2025-02-10' },
	{ clicks: 1000, impressions: 10000, date: '2025-02-11' },
	{ clicks: 10000, impressions: 1000, date: '2025-02-12' },
	{ clicks: 10000, impressions: 100000, date: '2025-02-13' },
	{ clicks: 1000, impressions: 10000, date: '2025-02-14' },
	{ clicks: 10000, impressions: 1000, date: '2025-02-15' },
	{ clicks: 1000, impressions: 10000, date: '2025-02-16' },
	{ clicks: 10000, impressions: 10000, date: '2025-02-17' },
	{ clicks: 1000, impressions: 10000, date: '2025-02-18' },
	{ clicks: 10000, impressions: 10000, date: '2025-02-19' },
	{ clicks: 1000, impressions: 1000, date: '2025-02-20' },
	{ clicks: 10000, impressions: 10000, date: '2025-02-21' },
	{ clicks: 1000, impressions: 118, date: '2025-02-22' },
	{ clicks: 10000, impressions: 10000, date: '2025-02-23' },
	{ clicks: 10000, impressions: 1000, date: '2025-02-24' },
	{ clicks: 10000, impressions: 10000, date: '2025-02-25' },
];

// Convert dates to readable format + day
const formatDate = ( dateStr ) =&gt; {
	const date = new Date( dateStr );
	return {
		readableDate: date.toLocaleDateString( 'en-GB', {
			day: '2-digit',
			month: 'short',
		} ),
		day: date.toLocaleDateString( 'en-GB', { weekday: 'short' } ),
	};
};

const trafficData = rawTrafficData.map( ( { date, clicks, impressions } ) =&gt; {
	const { readableDate, day } = formatDate( date );
	return { readableDate, day, clicks, impressions };
} );

const SiteSearchTrafficDummy = () =&gt; {
	const totalClicks = trafficData.reduce( ( sum, d ) =&gt; sum + d.clicks, 0 );
	const totalImpressions = trafficData.reduce(
		( sum, d ) =&gt; sum + d.impressions,
		0
	);

	return (
		<section>
			<container gap="none" justify="between" align="center" classname="p-1">
				<div classname="flex items-center gap-3">
					<title title="{" __ search traffic tag="h4" size="md"></title>
					<text size="{" weight="{" color="secondary">
						{ __( '(Last 20 days)', 'surerank' ) }
					</text>
				</div>
			</container>

			<container classname="p-1 rounded-lg bg-background-secondary gap-1 flex-wrap md:flex-nowrap">
				<div classname="w-full rounded-md bg-background-primary shadow-sm">
					<linechart colors="{" stroke: yaxisfontcolor="{" data="{" trafficdata datakeys="{" showtooltip showxaxis showyaxis biaxial tooltipindicator="dot" variant="gradient" xaxisdatakey="{" entry>
							`${ entry.readableDate } (${ entry.day })`
						}
						yAxisTickFormatter={ ( value ) =&gt;
							formatNumber( value )
						}
						showLegend={ false }
						chartHeight={ 288 }
						chartWidth="100%"
						lineChartWrapperProps={ {
							margin: {
								top: 25,
								right: 10,
								bottom: 25,
								left: 10,
							},
						} }
					/&gt;
				</linechart></div>

				<container classname="w-full md:w-[30%] gap-1 flex-row md:flex-col" align="stretch">
					{ [ 'Clicks', 'Impressions' ].map( ( label ) =&gt; (
						<container.item key="{" label classname="px-3 py-5 space-y-4 w-full h-full bg-background-primary rounded-md shadow-sm">
							<label tag="p" size="md" classname="font-medium">
								{ label }
							</label>
							<label tag="p" size="md" classname="font-semibold text-4xl">
								{ label === 'Clicks'
									? formatNumber( totalClicks )
									: formatNumber( totalImpressions ) }
							</label>
						</container.item>
					) ) }
				</container>
			</container>
		</section>
	);
};

export default SiteSearchTrafficDummy;
</p></body></html>
