import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { updateList } from '../actions/listsActions';
import FormBox from '../components/FormBox';
import Modal from '../components/Modal';
import InputBox from '../components/InputBox';

function EditListModal({ hideModal, dispatch, list }) {
    return (
        <Modal
            title="Edit list"
            hideModal={hideModal}
        >
            <FormBox
                request={formData => dispatch(updateList(list.id, formData))}
                onCancelClick={hideModal}
                onSuccess={hideModal}
                rows={[
                    <InputBox
                        name="title"
                        title="Title"
                        placeholder="Enter list title"
                        value={list.title}
                    />
                ]}
            />
        </Modal>
    );
};

EditListModal.propTypes = {
    list: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired
};

export default connect()(EditListModal);
