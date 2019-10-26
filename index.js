const output = 
`gulpfile.js
src/main/java/com/en/ssp/components/contactlists/ProtoContactListsController.java
src/main/webapps/common/react/components/checkbox.js
src/main/webapps/common/react/components/text-input.js
src/main/webapps/features/contact-lists/react/index/ContactListIndex.js
src/main/webapps/features/contact-lists/react/index/{IndexTableRow.js => ListRow.js}
src/main/webapps/features/contact-lists/react/individual-list/ContactRow.js
src/main/webapps/features/contact-lists/react/individual-list/IndividualList.js
src/main/webapps/features/contact-lists/react/individual-list/IndividualListHeader.js
src/main/webapps/features/contact-lists/react/individual-list/SearchBar.js
src/main/webapps/features/contact-lists/react/individual-list/TitleBar.js
src/main/webapps/features/contact-lists/react/individual-list/index.js
src/main/webapps/features/contact-lists/react/shared/buildQueryString.js
src/main/webapps/features/contact-lists/react/shared/getEcData.js
src/main/webapps/features/contact-lists/react/shared/multiple-select-menu.js
src/main/webapps/features/contact-lists/react/shared/parseQueryString.js
src/main/webapps/features/contact-lists/react/sis-import/DatePicker.js
src/main/webapps/features/contact-lists/react/sis-import/SisProviderImport.js
src/main/webapps/features/contact-lists/react/sis-import/StaffTab.js
src/main/webapps/features/contact-lists/react/sis-import/StudentsGuardiansTab.js
src/main/webapps/features/contact-lists/react/sis-import/index.js
src/main/webapps/features/contact-lists/react/sis-search-result/SisSearchResult.js
src/main/webapps/features/contact-lists/react/sis-search-result/index.js
src/main/webapps/features/contact-lists/sass/individual-list.scss
src/main/webapps/features/contact-lists/sass/sis-import.scss
src/main/webapps/features/contact-lists/sass/sis-search-result.scss
src/main/webapps/features/form-builder/react/public/app.js
src/main/webapps/features/form-builder/react/public/classes/payment-form.js
tomcat/routes/admin-apps.txt
tomcat/templates/contact-lists/individual-list.ftl
tomcat/templates/contact-lists/sis-import.ftl
tomcat/templates/contact-lists/sis-search-result.ftl
tomcat/templates/sections/list_pages.ftl`

const lines = output.split('\n')


const objects = lines.map((line) => {
  return line.split('/').reduceRight((obj, next) => ({[next]: obj}), {});
})

const tree = objects.reduceRight((main, object) => {
  return {...main, ...object}
}, {})

console.log(JSON.stringify(objects, null, 2))
