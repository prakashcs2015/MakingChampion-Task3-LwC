import { LightningElement, api, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class AccountMainComponent extends LightningElement {
    @api index = 0;
    @api accessKey;
    @api recordId;
    keyIndex = 0;
    selectedItems = [];
    selectedRecords = [];
    @track itemList = [{
        id: 0
    }];
    addRecords() {
        console.log("selected access-Key" + this.selectedItems);
        var isVal = true;
        this.template
            .querySelectorAll("lightning-input-field")
            .forEach((element) => {
                isVal = isVal && element.reportValidity();
            });
        if (isVal) {
            this.template
                .querySelectorAll("lightning-record-edit-form")
                .forEach((element) => {
                    element.submit();
                });
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Success",
                    message: "Contacts successfully created",
                    variant: "success"
                })
            );

            eval("$A.get('e.force:refreshView').fire();");


        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: 'Please enter all the required fields',
                    variant: 'error',
                }),
            );
        }
        this.template.querySelectorAll('lightning-input-field').forEach(each => { each.value = ''; });


    }
    addRow() {
        ++this.keyIndex;
        var newItem = [{ id: this.keyIndex }];
        this.itemList = this.itemList.concat(newItem);
    }
    removeRow(event) {
        if (this.itemList.length == 1) {
            const event = new ShowToastEvent({
                title: "Cant delete",
                message: "You can not delete default Row",
                variant: "Warning",
                mode: "dismissable"
            });
            this.dispatchEvent(event);
        } else {
            if (this.itemList.length > 1) {
                this.itemList = this.itemList.filter(function(element) {
                    return parseInt(element.id) !== parseInt(event.target.accessKey);
                });
            }
        }
    }
    selectHandle(event) {
        console.log("account id " + this.recordId);
        console.log("account index " + event.target.accessKey);
        console.log("checked or not " + event.target.checked);
        if (event.target.checked) {
            this.selectedItems.push(event.target.accessKey);
            console.log(
                "input field values " +
                this.template.querySelector("lightning-input-field")
            );
        }
        if (!event.target.checked) {
            var index = this.selectedItems.indexOf(event.target.checked);
            this.selectedItems.splice(index, 1);
        }
    }
}