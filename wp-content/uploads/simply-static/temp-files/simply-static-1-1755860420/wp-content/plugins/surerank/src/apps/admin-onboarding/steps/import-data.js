<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { RadioButton, Title } from '@bsf/force-ui';
import StepNavButtons from '../components/nav-buttons';
import { useOnboardingState } from '@Onboarding/store';

const options = [
	{
		label: __( 'SEOPress', 'surerank' ),
		value: 'seopress',
	},
	{
		label: __( 'AIO SEO', 'surerank' ),
		value: 'aioseo',
	},
	{
		label: __( 'Yoast SEO', 'surerank' ),
		value: 'yoastseo',
	},
];

const ImportData = () =&gt; {
	const [ { import_from = '' }, dispatch ] = useOnboardingState();
	// Local form state
	const [ formState, setFormState ] = useState( import_from );

	const handleFormSubmit = ( event ) =&gt; {
		event.preventDefault();
	};

	const handleChange = ( value ) =&gt; {
		setFormState( value );
	};

	const handleNext = () =&gt; {
		dispatch( {
			import_from: formState,
		} );
	};

	return (
		</p><form classname="flex flex-col gap-6" onsubmit="{" handleformsubmit>
			<div classname="space-y-1">
				<title tag="h4" title="{" __ data from your current plugins size="md"></title>
				<p>
					{ __(
						'We have deducted few SEO plugins installed on your website. Select the plugin from which you want to import',
						'surerank'
					) }
				</p>
			</div>
			{ /* Settings / options */ }
			<div>
				<radiobutton.group columns="{" onchange="{" handlechange value="{" formstate vertical size="md" name="import_from">
					{ options.map( ( option ) =&gt; (
						<radiobutton.button key="{" option.value buttonwrapperclasses="pl-3 py-3" label="{" heading: option.label value="{" borderon></radiobutton.button>
					) ) }
				</radiobutton.group>
			</div>
			{ /* Nav Buttons */ }
			<stepnavbuttons nextprops="{" onclick: handlenext></stepnavbuttons>
		</form>
	);
};

export default ImportData;
</body></html>
