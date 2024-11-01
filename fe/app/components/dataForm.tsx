import { Button, Textarea } from '@nextui-org/react';
import { Formik } from 'formik';

export default ({ props }: { props: { data: string, submitData: (values: any) => void } }) => {
  const initialValues = { data: props.data };

  return (
    <Formik initialValues={initialValues} enableReinitialize={true} validate={values => {
      const errors = {};
      if (!values.data) {
        errors.data = 'Data is required';
      }
      return errors;
    }} onSubmit={(values, { setSubmitting }) => {
      props.submitData(values)
      setSubmitting(false);
    }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <Textarea
              label="Data"
              labelPlacement="outside"
              minRows={4}
              name="data"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.data}
              size="lg"
              isInvalid={errors.data && touched.data}
              errorMessage={errors.data}
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="my-4">Submit</Button>
        </form>
      )}
    </Formik>
  );
};
