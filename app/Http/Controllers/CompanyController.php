<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use App\Lib\ApiFeedbackSender;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    use ApiFeedbackSender;

    public function getAll() {
        $companies = Company::all();
        return $this->sendSuccess($companies);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), $this->getCompanyValidationRules());
        if($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        $company = new Company;
        $company->name = $request->name;
        $company->vat_number = $request->vat_number;
        $company->address = $request->address;
        $company->type = $request->type;
        $company->save();
        
        return $this->sendSuccess('Empresa creada con éxito');
    }

    private function getCompanyValidationRules() {
        return [
            'name' => ['required', 'string', 'max:250'],
            'vat_number' => ['required', 'string', 'max:250'],
            'address' => ['required', 'string', 'max:250'],
            'type' => ['required'],
        ];
    }

    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), $this->getCompanyValidationRules());
        if($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        $company = Company::find($id);
        $company->name = $request->name;
        $company->vat_number = $request->vat_number;
        $company->address = $request->address;
        $company->type = $request->type;
        $company->save();
        
        return $this->sendSuccess('Empresa actualizada con éxito');
    }

    public function delete($id) {
        $company = Company::find($id);
        if($company) {
            $company->delete();
            return $this->sendSuccess('Empresa eliminada con éxito');
        }
        return $this->sendError('Empresa no encontrada');
    }

}
