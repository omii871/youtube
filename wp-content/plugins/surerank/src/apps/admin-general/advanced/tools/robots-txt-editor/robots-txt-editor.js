<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { __ } from '@wordpress/i18n';
import { TextArea, Container, Button, toast } from '@bsf/force-ui';
import { DotIcon } from '@/global/components/icons';
import { LoaderCircle } from 'lucide-react';
import Alert from '@/global/components/alert';
import GeneratePageContent from '@/functions/page-content-generator';
import PageContentWrapper from '@/apps/admin-components/page-content-wrapper';
import withSuspense from '@/apps/admin-components/hoc/with-suspense';
import apiFetch from '@wordpress/api-fetch';
import { useState, useCallback } from '@wordpress/element';
import { ROBOTS_TXT_URL } from '@Global/constants/api';
import { cn } from '@/functions/utils';

const EDITOR_PLACEHOLDER = `# Edit your robots.txt file here to manage how search engines crawl your site

User-Agent: *
Disallow:

Sitemap: https://yourwebsite.com/sitemap_index.xml`;

const RobotsTxtEditorSettings = () =&gt; {
	const {
		robots_data = {},
		wp_reading_settings_url: wpReadingSettingsUrl = '',
	} = window?.surerank_admin_common || {};

	const {
		robots_txt_content: initialContent = '',
		search_engine_visibility: isSearchEngineEnabled = false,
		robots_file_exists: isRobotsFileExist = false,
		robot_file_content: robotsFileActualContent = '',
	} = robots_data;

	const getInitialContent = () =&gt; {
		if ( isRobotsFileExist ) {
			return robotsFileActualContent || '';
		}
		return initialContent;
	};

	const [ robotsTxtContent, setRobotsTxtContent ] = useState(
		getInitialContent()
	);
	const [ isUpdating, setIsUpdating ] = useState( false );
	const [ hasUnsavedSettings, setHasUnsavedSettings ] = useState( false );
	const cursorNotAllowed = isSearchEngineEnabled === '0' || isRobotsFileExist;
	const getAlertMessage = () =&gt; {
		if ( isRobotsFileExist ) {
			return __(
				'The contents are locked because a robots.txt file exists in the root folder. If you want to edit the contents, please delete the existing robots.txt file from your server.',
				'surerank'
			);
		}
		if ( isSearchEngineEnabled === '0' ) {
			return (
				
					<b>{ __( 'Warning:', 'surerank' ) }</b>{ ' ' }
					{ __(
						"Your site's search engine visibility is currently set to Hidden in ",
						'surerank'
					) }
					<a href="https://omii871.github.io/youtube/wp-content/plugins/surerank/src/apps/admin-general/advanced/tools/robots-txt-editor/%7B" wpreadingsettingsurl target="_blank" rel="noopener noreferrer" classname="text-badge-color-sky no-underline hover:no-underline cursor-pointer bg-transparent border-none p-0 outline-none shadow-none focus:ring-0">
						{ __( 'Settings &gt; Reading', 'surerank' ) }
					</a>
					{ __(
						'. Any changes made here will not be applied until you set the search engine visibility to Public. This is required to update the robots.txt content.',
						'surerank'
					) }
				&gt;
			);
		}

		return (
			
				{ __(
					'Changes to your robots.txt file can affect how search engines crawl and index your site. Editing this file incorrectly may block important pages from search results or impact your site&rsquo;s SEO. Please proceed with caution. Leave empty to let WordPress manage it. If a robots.txt file exists, delete it to use this setting. Verify the robots.txt content ',
					'surerank'
				) }
				<a href="https://technicalseo.com/tools/robots-txt/" target="_blank" rel="noopener noreferrer" classname="text-badge-color-sky no-underline hover:no-underline cursor-pointer bg-transparent border-none p-0 outline-none shadow-none focus:ring-0">
					{ __( 'here.', 'surerank' ) }
				</a>
			&gt;
		);
	};

	// Track unsaved changes
	const handleContentChange = ( value ) =&gt; {
		setRobotsTxtContent( value );
		setHasUnsavedSettings( value !== initialContent );
	};

	// Direct update function
	const updateRobotsTxt = useCallback(
		async ( content ) =&gt; {
			if ( isUpdating ) {
				return;
			}

			setIsUpdating( true );
			try {
				const response = await apiFetch( {
					path: ROBOTS_TXT_URL,
					method: 'POST',
					data: {
						robots_txt_content: content,
					},
				} );
				if ( ! response?.success ) {
					throw new Error(
						response?.message ??
							__(
								'Failed to update robots.txt file.',
								'surerank'
							)
					);
				}
				setRobotsTxtContent( content );
				setHasUnsavedSettings( false );
				toast.success(
					__( 'Settings saved successfully.', 'surerank' )
				);
			} catch ( error ) {
				toast.error( error.message, {
					description: __(
						'An unexpected error occurred while updating the robots.txt content. Please try again later.',
						'surerank'
					),
				} );
			} finally {
				setIsUpdating( false );
			}
		},
		[ isUpdating ]
	);

	// Function to determine button icon
	const getButtonIcon = () =&gt; {
		if ( isUpdating ) {
			return <loadercircle classname="animate-spin"></loadercircle>;
		}
		if ( hasUnsavedSettings ) {
			return <doticon></doticon>;
		}
		return null;
	};

	return (
		<container direction="column" classname="w-full gap-6">
			{ /* Code Editor */ }
			<textarea value="{" robotstxtcontent onchange="{" handlecontentchange rows="{" size="md" disabled cursornotallowed classname="{" cn text-sm w-full bg-background-inverse text-background-tertiary placeholder="{" robotsfileactualcontent editor_placeholder></textarea>

			{ /* Warning Alert */ }
			<div classname="w-full">
				<alert id="robots-txt-warning" color="warning" message="{" getalertmessage></alert>
			</div>

			{ /* Save Button with unsaved settings feedback */ }
			<div>
				<button onclick="{"> updateRobotsTxt( robotsTxtContent ) }
					variant="primary"
					icon={ getButtonIcon() }
					className={ cn(
						isUpdating || ! hasUnsavedSettings
							? 'opacity-60 bg-background-brand cursor-not-allowed pointer-events-none'
							: ''
					) }
					size="md"
				&gt;
					{ isUpdating
						? __( 'Saving&hellip;', 'surerank' )
						: __( 'Save', 'surerank' ) }
				</button>
			</div>
		</container>
	);
};

export const PAGE_CONTENT = [
	{
		container: null,
		content: [
			{
				id: 'robots-txt-editor-settings',
				type: 'custom',
				component: <robotstxteditorsettings></robotstxteditorsettings>,
				searchKeywords: [
					'robots.txt',
					'robots txt editor',
					'robots file',
				],
			},
		],
	},
];

const RobotsTxtEditor = () =&gt; {
	return (
		<pagecontentwrapper title="{" __ editor description="{" your robots.txt file to control what search engines can see on website.>
			<generatepagecontent json="{" page_content hideglobalsavebutton="{" true></generatepagecontent>
		</pagecontentwrapper>
	);
};

export default withSuspense( RobotsTxtEditor );
</p></body></html>
